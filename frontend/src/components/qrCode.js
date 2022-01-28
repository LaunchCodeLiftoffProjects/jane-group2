import React from 'react';

export const QRCode = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <img id="Potatoes" title="QR Code" src={`data:image/png;base64,${props.qrCode}`} className="qr-code" alt="..."/>
        </div>
    );
});