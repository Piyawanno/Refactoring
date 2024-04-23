export function PackageOperation({handler, pid, status, callback}) {
	let PackageStatus = handler.enum.PackageStatus;

	let handleOnclick = (pid, status) => {
		return () => {
			handler.changeStatus(pid, status, callback);
		}
	}

	if(!PackageStatus){
		return <></>
	}else if(status == PackageStatus.REGISTERED){
		return <>
		<button onClick={handleOnclick(pid, PackageStatus.ON_TRANSPORT)}>
			Transportation
		</button>
		<button onClick={handleOnclick(pid, PackageStatus.REJECTED)}>
			Cancel
		</button>
		<button onClick={handleOnclick(pid, PackageStatus.LOST)}>
			Lost
		</button>
		</>
	}else if(status == PackageStatus.ON_TRANSPORT){
		return <>
		<button onClick={handleOnclick(pid, PackageStatus.RECEIVED)}>
			Receive
		</button>
		<button onClick={handleOnclick(pid, PackageStatus.REJECTED)}>
			Cancel
		</button>
		<button onClick={handleOnclick(pid, PackageStatus.LOST)}>
			Lost
		</button>
		</>
	}
}