import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './modal.scss';

type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' || e.key === 'Esc') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return createPortal(
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.body,
	);
}

export default Modal;
