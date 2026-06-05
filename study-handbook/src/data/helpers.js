export function exam(id, title, detail) {
  return { id, title, detail };
}

export function lesson(id, order, title, center, knowledge, examPoints, wrongNotes = []) {
  return {
    id,
    order,
    title,
    center,
    knowledge,
    examPoints,
    wrongNotes
  };
}
