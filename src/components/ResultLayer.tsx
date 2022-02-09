import { isValid, solve } from "@aminekamal/ds-algo";
import Tesseract from "tesseract.js";
import { removeInvalidChars } from "../Utils";
import CalculateIcon from '@mui/icons-material/Calculate';

interface ResultProps
{
    bbox: Tesseract.Bbox;
    expression: string;
    result?: number;
}

function Result({bbox, expression, result}: ResultProps, index: number) 
{
    return (
        <>
            <CalculateIcon
                style={{
                    position: "fixed",
                    left: `${bbox.x0 - 6.5}px`,
                    top: `${bbox.y0 - 23}px`,
                    cursor: "pointer"
                }}
                color="error"
            />
            <div 
                key={index} 
                style={{
                    position: "fixed",
                    left: `${bbox.x0 - 4}px`,
                    top: `${bbox.y0 - 4}px`,
                    minWidth: `${bbox.x1 - bbox.x0 + 4}px`,
                    minHeight: `${bbox.y1 - bbox.y0 + 4}px`,
                    border: "solid 3px #d32f2f",
                    cursor: "pointer"
                }}
                onClick={() => alert(`${expression}=${result}`)}
            >
            </div>
        </>
    );
}

interface ResultLayerProps 
{
    result: Tesseract.RecognizeResult;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function ResultLayer({result, canvasRef}: ResultLayerProps) 
{
    const lines = result.data.lines.filter(({text}) => isValid(removeInvalidChars(text)));
    const rect = canvasRef.current!.getBoundingClientRect();
    const xFactor = rect.width / canvasRef.current!.width;
    const yFactor = rect.height / canvasRef.current!.height;

    const results = lines.map(({bbox, text}) => ({
        bbox: { x0: bbox.x0 * xFactor + rect.x, x1: bbox.x1 * xFactor + rect.x, y0: bbox.y0 * yFactor + rect.y, y1: bbox.y1 * yFactor + rect.y }, 
        expression: removeInvalidChars(text),
        result: solve(removeInvalidChars(text))
    }));

    return <>{results.map(Result)}</>;
}