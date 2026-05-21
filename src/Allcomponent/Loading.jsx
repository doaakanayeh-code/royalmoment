export default function Loading() {
    return (
        <div className="spinner-container-submit">
            <div className="spinner"></div>

            <style>{`
                .spinner-container-submit {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                }

                .spinner {
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(212, 175, 55, 0.3);
                    border-top: 5px solid #DCC8BB;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}