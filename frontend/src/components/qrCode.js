import React from 'react';

export const QRCode = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            {props.qrCode != null && props.qrCode.length > 0
                ? <img className="qr-code" id="Potatoes" title="QR Code" src={`data:image/png;base64,${props.qrCode}`} alt="..."/>
                : <div className="qr-code"/>
            }
        </div>
    );
});