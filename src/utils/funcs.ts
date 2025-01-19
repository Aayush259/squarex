
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

export const getImageFileBase64 = async (imageObjectUrl: string): Promise<string> => {
    if (!imageObjectUrl.startsWith("blob:")) return imageObjectUrl;

    const blob = await fetch(imageObjectUrl).then(res => res.blob());
    const mimeToExtension: { [key: string]: string } = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/webp": "webp",
    }
    const extension = mimeToExtension[blob.type] || "png";
    const file = new File([blob], `image.${extension}`, { type: blob.type });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
