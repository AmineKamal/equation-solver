
export function removeInvalidChars(s: string) 
{
    return s.replace(/[“‘a-zA-Z\|&\\#,$~%.'":?<>{}\n\r! ]/g, '').replace("—", "-");
}

export function toBinaryImage(ctx: CanvasRenderingContext2D) 
{
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Get all canvas pixel data
    const imageData = ctx.getImageData(0, 0, width, height);
    const actualData = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);

    // Run through the image. 
    // The height of the image.
    for (let y = 0; y < height; y++) 
    {
        // 4 ints per pixel.
        let inpos = y * width * 4; 
        let outpos = inpos;

        // The width of the image.
        for (let x = 0; x < width; x++) 
        {
            const r = imageData.data[inpos++]; // red channel
            const g = imageData.data[inpos++]; // green channel
            const b = imageData.data[inpos++]; // blue channel
            const a = imageData.data[inpos++]; // alpha channel

            const gray =  (0.299 * r + 0.587 * g + 0.114 * b); // to grayscale

            // Threshold to convert into black or white
            if (gray > 110)
            {
                // Set the pixel is white.
                imageData.data[outpos++] = 255;
                imageData.data[outpos++] = 255;
                imageData.data[outpos++] = 255;
                imageData.data[outpos++] = a;
            }
            else
            {
                // Set the pixel is black.
                imageData.data[outpos++] = 0;
                imageData.data[outpos++] = 0;
                imageData.data[outpos++] = 0;
                imageData.data[outpos++] = a;
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);

    return actualData;
}