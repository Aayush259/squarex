
// Restore cursor position
export const restoreCursorPosition = (element: HTMLSpanElement | null, cursorPosition: number, selection: Selection) => {
    if (!element) return;
    requestAnimationFrame(() => {
        const newRange = document.createRange();
        const textNode = element.firstChild;
        if (textNode) {
            const position = Math.min(cursorPosition, textNode.textContent?.length || 0);
            newRange.setStart(textNode, position);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
            element.focus();
        }
    });
};