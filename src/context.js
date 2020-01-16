import React, {useState} from 'react';

const config = {
	overlay:{
		visible: false,
		component: null,
		callback: ()=> {}
	},
	setOverlay: () => {}
};

const Context = React.createContext(config);

const Provider = props =>{
	const setOverlay = (newConfig) => {
		setState({...state, overlay: newConfig});
	};
    
	const [state, setState] = useState({...config, setOverlay});

	return (
		<Context.Provider value={state}>
			{props.children}
		</Context.Provider>);
};

const Consumer = props => 
	<Context.Consumer>
		{props.children}
	</Context.Consumer>;

export {Context, Provider, Consumer};