import React from 'react';

let NewTask = React.createClass({
	render() {
		return(
			<div className="NewTask col-md-7">
				<form className="form-horizontal">
					<div className="form-group">
						<div className="col-md-12">
							<input type="text" className="form-control" placeholder="Tytuł" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-12">
							<textarea className="form-control" rows="8" placeholder="Opis" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-12">
							<select className="form-control">
								<option>Status</option>
								<option value="Ważne">Ważne</option>
								<option value="Poprawa">Poprawa</option>
								<option value="Nowa funkcjonalność">Nowa funkcjonalność</option>
							</select>
						</div>
					</div>
				</form>
			</div>
		)
	}
});

export default NewTask;