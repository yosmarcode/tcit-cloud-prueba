import React from 'react';

export interface ModalComponentsProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    childrenFooter?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showCloseButton?: boolean;
}

export const ModalComponents = ({
    isOpen,
    onClose,
    title,
    children,
    childrenFooter,
    size = 'md',
    showCloseButton = true
}: ModalComponentsProps) => {
    // Cerrar modal al presionar ESC
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
            onClick={onClose}
        >
            <div
                className={`
                    bg-white 
                    rounded-2xl 
                    shadow-2xl 
                    w-full 
                    ${sizeClasses[size]}
                    max-h-[90vh]
                    overflow-hidden
                    animate-slideUp
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        {title && (
                            <h2 className="text-2xl font-bold text-gray-800">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="
                                    ml-auto
                                    text-gray-400 
                                    hover:text-gray-600 
                                    hover:bg-gray-100
                                    rounded-full
                                    p-2
                                    transition 
                                    duration-200
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                                aria-label="Cerrar modal"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    {children}
                </div>
                {childrenFooter && (
                    <div className="flex items-center justify-end p-6 border-t border-gray-200">
                        {childrenFooter}
                    </div>
                )}
            </div>
        </div>
    );
};
