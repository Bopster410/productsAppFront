import { FunctionComponent } from 'react';

const FONT = "'NunitoSans', sans-serif";

type Props = {
    header: string;
    description: string | React.ReactNode;
};

const ErrorPlaceholder = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='350'
            height='160'
        >
            <g
                stroke='null'
                id='svg_15'
            >
                <path
                    stroke='#aaabbc'
                    id='svg_10'
                    d='m261.15402,138.65223c-42.20279,-0.35102 -36.05884,-13.50439 -34.61649,-28.60775c1.44235,-15.10336 15.49136,-28.60775 34.61649,-28.60775c19.12513,0 32.45296,11.74932 34.61649,28.60775c2.16353,16.85843 7.5863,28.95877 -34.61649,28.60775z'
                    opacity='undefined'
                    strokeWidth='6'
                    fill='none'
                />
                <g
                    stroke='null'
                    id='svg_4'
                >
                    <line
                        stroke='#aaabbc'
                        strokeWidth='6'
                        id='svg_2'
                        y2='114.19671'
                        x2='256.133'
                        y1='97.64882'
                        x1='240.36277'
                        fill='none'
                    />
                    <path
                        stroke='#aaabbc'
                        id='svg_3'
                        d='m257.35646,96.87154l-16.31769,17.49543'
                        opacity='undefined'
                        strokeWidth='6'
                        fill='none'
                    />
                </g>
                <g
                    stroke='null'
                    id='svg_13'
                >
                    <line
                        stroke='#aaabbc'
                        strokeWidth='6'
                        id='svg_11'
                        y2='115.19996'
                        x2='280.76407'
                        y1='98.65207'
                        x1='264.99383'
                        fill='none'
                    />
                    <path
                        stroke='#aaabbc'
                        id='svg_12'
                        d='m281.98752,97.87479l-16.31769,17.49544'
                        opacity='undefined'
                        strokeWidth='6'
                        fill='none'
                    />
                </g>
                <path
                    stroke='#aaabbc'
                    id='svg_14'
                    d='m275.87484,128.58071c-5.30278,-4.72362 -4.59198,-5.68506 -13.53518,-6.64651c-8.20418,-0.54343 -9.65929,2.1737 -14.86594,6.39569'
                    opacity='undefined'
                    strokeWidth='6'
                    fill='none'
                />
            </g>
            <text
                transform='matrix(1.0021 0 0 1 -0.00282207 0)'
                stroke='#aaabbc'
                fontWeight='bold'
                xmlSpace='preserve'
                textAnchor='start'
                fontFamily={FONT}
                fontSize='48'
                id='svg_16'
                y='52.22567'
                x='1.34576'
                strokeWidth='0'
                fill='#aaabbc'
            >
                Что-то пошло
            </text>
            <text
                transform='matrix(1.0021 0 0 1 -0.00282207 0)'
                stroke='#aaabbc'
                fontWeight='bold'
                xmlSpace='preserve'
                textAnchor='start'
                fontFamily={FONT}
                fontSize='48'
                id='svg_17'
                y='129.3203'
                x='22.05846'
                strokeWidth='0'
                fill='#aaabbc'
            >
                не так
            </text>
        </svg>
    );
};

export const ErrorMessage: FunctionComponent<Props> = ({
    header,
    description,
}) => {
    return (
        <div>
            <div
                style={{ marginBottom: '16px' }}
                className='h4'
            >
                {header}
            </div>
            {typeof description === 'string' ? (
                <div className='p-xl'>{description}</div>
            ) : (
                description
            )}
        </div>
    );
};
