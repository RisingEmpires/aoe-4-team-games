import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useReplicant } from 'use-nodecg';

interface DropdownOption {
	value: string;
	label: string;
}

export function Aoe4TeamGames() {

	//Import all teams
	const [teams, set_teams] = useReplicant<Array<any>>('assets:teams', []);

	const [leftSideIcon, set_leftSideIcon] = useReplicant<DropdownOption>('leftSideIcon', { value: '', label: '' });
	const [rightSideIcon, set_rightSideIcon] = useReplicant<DropdownOption>('rightSideIcon', { value: '', label: '' });

	const [leftName, set_leftName] = useReplicant<string>('leftName', '', { namespace: 'aoe-4-civ-draft' });
	const [rightName, set_rightName] = useReplicant<string>('rightName', '', { namespace: 'aoe-4-civ-draft' });

	const [updateNames, set_updateNames] = useReplicant<boolean>('updateNames', false);

	//@ts-ignore
	const [options, set_options] = useState([]);

	useEffect(() => {
		console.log(teams)
		if (!teams) return;
		let _array = []

		teams.forEach((element, i) => {
			var name = element.name
			name = name.replace(/_/g, ' ');
			//@ts-ignore
			_array.push({ value: element.url, label: name });
		});
		//@ts-ignore
		_array.sort((a, b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0))
		set_options(_array);
	}, [teams]);

	const handleLeftSideChange = (selectedOption) => {
		set_leftSideIcon(selectedOption)
		if (updateNames === true) {
			set_leftName(selectedOption.label)
		}
	}

	const handleRightSideChange = (selectedOption) => {
		set_rightSideIcon(selectedOption)
		if (updateNames === true) {
			set_rightName(selectedOption.label)
		}
	}

	const swapTeams = () => {
		let temp = leftSideIcon
		set_leftSideIcon(rightSideIcon)
		set_rightSideIcon(temp)
		if (updateNames === true) {
			let temp2 = leftName
			set_leftName(rightName)
			set_rightName(temp2)
		}
	}

	return (
		<>
			<div>
				<label>Update Team Names</label>
				<input type='checkbox' checked={updateNames} onChange={(() => set_updateNames(!updateNames))} />
			</div>
			<div>
				{leftName}
				<h1>Left Side Icon</h1>
				<Select className="teamDropdown" options={options} onChange={handleLeftSideChange} value={leftSideIcon} placeholder={'Select Team'} />

				<div style={{
					padding: '5px 0px',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					width: '100%'
				}}>
					<hr style={{
						margin: '2rem',
						width: '33.3%'
					}} />
					<button onClick={swapTeams} className="swapButton" name="swapTeams" style={{ margin: '2px 2px' }}>
						Swap Teams
					</button>
					<hr style={{
						margin: '2rem',
						width: '33.3%'
					}} />
				</div>

				{rightName}
				<h1>Right Side Icon</h1>
				<Select className="teamDropdown" options={options} onChange={handleRightSideChange} value={rightSideIcon} placeholder={'Select Team'} />
			</div>
		</>
	)
}
