import React from 'react';

export default function Layout({ children }) {
	return (
		<div className="layout-container">
			<img src="/assets/logo.svg" />
			{children}
		</div>
	);
}
