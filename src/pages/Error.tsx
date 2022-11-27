
export default function Error() {
	return (
		<div className="flex flex-col test w-full min-h-full">
			<div className="auto-center flex-col">
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<button className="btn btn-primary">Retry</button>
				</p>
			</div>
		</div>
	);
}
