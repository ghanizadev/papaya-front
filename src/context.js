import React, {useState} from 'react';

const config = {
	context: {
		overlay:{
			visible: false,
			component: null,
			callback: ()=> {}
		},
		serverData: [],
	},
	setContext: () => {},
};

const Context = React.createContext(config);

const Provider = props =>{
	const setContext = (newConfig) => {
		setState({...state, context: newConfig});
	};
    
	const [state, setState] = useState({...config, setContext});

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