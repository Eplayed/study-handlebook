import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys

from PIL import Image, ImageDraw, ImageOps


SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
CONFIG_PATH = SCRIPT_DIR / "evidence-assets.config.mjs"


def load_config():
    node_code = (
        "import { evidenceConfig } from './scripts/evidence-assets.config.mjs';"
        "process.stdout.write(JSON.stringify(evidenceConfig));"
    )
    result = subprocess.run(
        ["node", "--input-type=module", "-e", node_code],
        cwd=PROJECT_ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def crop_box(width, height, rect):
    x, y, w, h = rect
    left = max(0, round(x * width))
    top = max(0, round(y * height))
    right = min(width, round((x + w) * width))
    bottom = min(height, round((y + h) * height))
    return (left, top, right, bottom)


def apply_masks(image, masks):
    if not masks:
        return image
    draw = ImageDraw.Draw(image)
    width, height = image.size
    for mask in masks:
        draw.rectangle(crop_box(width, height, mask), fill=(248, 246, 238))
    return image


def save_asset(source_path, output_path, rect, masks=None):
    with Image.open(source_path) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        cropped = image.crop(crop_box(image.width, image.height, rect))
        cropped = apply_masks(cropped, masks or [])
        if cropped.width > 1280:
            ratio = 1280 / cropped.width
            cropped = cropped.resize((1280, round(cropped.height * ratio)), Image.Resampling.LANCZOS)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        cropped.save(output_path, "JPEG", quality=84, optimize=True)


def main():
    config = load_config()
    learning_root = Path(config["learningRoot"])
    output_dir = PROJECT_ROOT / config["outputDir"]
    generated = []

    for asset in config["assets"]:
        source_path = learning_root / asset["source"]
        output_path = output_dir / asset["output"]
        if not source_path.exists():
            raise FileNotFoundError(source_path)
        save_asset(source_path, output_path, asset["rect"], asset.get("masks"))
        generated.append(str(output_path.relative_to(PROJECT_ROOT)))

    print(f"Generated {len(generated)} evidence images")
    for item in generated:
        print(f"- {item}")


if __name__ == "__main__":
    main()
