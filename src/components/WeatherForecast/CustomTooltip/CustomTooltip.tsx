import React, {useState} from 'react';
import './CustomTooltip.css';

interface CustomTooltipProps {
    children: React.ReactNode;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({children, content, position = 'top'}) => {
    const [visible, setVisible] = useState(false);
    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div className="tooltip-wrapper" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && (
                <div className={`tooltip-box tooltip-${position}`} role="tooltip" aria-label={content}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default CustomTooltip;
