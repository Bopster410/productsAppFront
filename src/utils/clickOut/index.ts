export function isClickOut(htmlElement: Element | null, e: MouseEvent) {
    if (htmlElement === null) return true;

    const dimensions = htmlElement.getBoundingClientRect();
    return (
        e.clientX < dimensions.left ||
        e.clientX > dimensions.right ||
        e.clientY < dimensions.top ||
        e.clientY > dimensions.bottom
    );
}
