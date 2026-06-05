export function exam(id, title, detail) {
  return { id, title, detail };
}

export function lesson(id, order, title, center, knowledge, examPoints, options = {}) {
  return {
    id,
    order,
    title,
    center,
    knowledge,
    examPoints,
    ...(Array.isArray(options) ? { wrongNotes: options } : options)
  };
}
