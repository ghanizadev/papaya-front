import React, {useState} from 'react';
import {ContentContainer, ContentHeader, Input, Select, Button, TextArea} from '../components';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const ProviderInterface = props => {
    const [body, setBody] = useState({
        providerId: '0000',
        name: '',
        address: {
            street: '',
            postalCode: '',
            district: '',
            city: '',
            state: '',
        },
        cnpj: '',
        email: '',
        website: '',
        phoneNumber: ''
    });


    return (
        <ContentContainer>
			<ContentHeader>Produtos</ContentHeader>
			
			<Tabs>
				<TabList>
					<Tab>Adicionar Fornecedor</Tab>
					<Tab>Alterar Fornecedor</Tab>
				</TabList>
	
				<TabPanel>
					<div style={{width: '100%', display: 'flex', margin:'auto', flexDirection: 'column'}}>
						<h3>Fornecedor</h3>
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<Input
                            proportion={1}
                            label='Código'
                            placeholder="00000"
                            size={5}
                            onChange={e => setBody({...body, providerId: e.target.value}) }
                            /> 
                            <Input
                            proportion={3} 
							label="Fornecedor"
							placeholder="Digite aqui o nome do fornecedor"
							onChange={e => setBody({...body, name: e.target.value})} 
						    />
						</div>

						<div style={{display: 'flex', flexDirection: 'row'}}>
						<Input
                            proportion={4}
							label="Endereço"
							placeholder="Digite aqui o endereço do fornecedor"
							onChange={e => setBody({...body, address: { ...body.address, street: e.target.value}}) }
						/>

    					<Input
                            proportion={1}
							label="Número"
							onChange={e => setBody({...body, address: { ...body.address, number: e.target.value}}) }
						/>
						</div>

						<div style={{display: 'flex', flexDirection: 'row'}}>
                        <Input
                            proportion={1.5}
							label="Bairro"
							placeholder="Digite aqui o bairro"
							onChange={e => setBody({...body, address: { ...body.address, district: e.target.value}})}
						/>

                        <Input
                            proportion={1.5}
							label="Cidade"
							placeholder="Digite aqui a cidade"
							onChange={e => setBody({...body, address: { ...body.address, city: e.target.value}}) }
						/>

                        <Select proportion={1.5} label="Estado" placeholder="Selecione" onChange={e => setBody({...body, address: { ...body.address, state: e.target.value}}) } >
                        
                            <option value="AC">Acre (AC)</option>
                            <option value="AL">Alagoas (AL)</option>
                            <option value="AP">Amapá (AP)</option>
                            <option value="AM">Amazonas (AM)</option>
                            <option value="BA">Bahia (BA)</option>
                            <option value="CE">Ceará (CE)</option>
                            <option value="DF">Distrito Federal (DF)</option>
                            <option value="ES">Espírito Santo (ES)</option>
                            <option value="GO">Goiás (GO)</option>
                            <option value="MA">Maranhão (MA)</option>
                            <option value="MT">Mato Grosso (MT)</option>
                            <option value="MS">Mato Grosso do Sul (MS)</option>
                            <option value="MG">Minas Gerais (MG)</option>
                            <option value="PA">Pará (PA)</option>
                            <option value="PB">Paraíba (PB)</option>
                            <option value="PR">Paraná (PR)</option>
                            <option value="PE">Pernambuco (PE)</option>
                            <option value="PI">Piauí (PI)</option>
                            <option value="RJ">Rio de Janeiro (RJ)</option>
                            <option value="RN">Rio Grande do Norte (RN)</option>
                            <option value="RS">Rio Grande do Sul (RS)</option>
                            <option value="RO">Rondônia (RO)</option>
                            <option value="RR">Roraima (RR)</option>
                            <option value="SC">Santa Catarina (SC)</option>
                            <option value="SP">São Paulo (SP)</option>
                            <option value="SE">Sergipe (SE)</option>
                            <option value="TO">Tocantins (TO)</option>

                        </Select>

                        <Input
							label="CEP"
							placeholder="Digite aqui o CEP"
							onChange={e => setBody({...body, address: { ...body.address, postalCode: e.target.value}}) }
						/>
						</div>


						<div style={{display: 'flex', flexDirection: 'row'}}>

                            <Input
                                label="CNPJ"
                                placeholder="Digite aqui o CNPJ"
                                onChange={e => setBody({...body, cnpj: e.target.value })}
                            />

                            <Input
                                label="Email"
                                placeholder="Digite aqui o endereço do fornecedor"
                                onChange={e => setBody({...body, email: e.target.value }) }
                             />

                            <Input
                                label="Telefone"
                                placeholder="Digite aqui o telefone do fornecedor"
                                onChange={e => setBody({...body, phoneNumber: e.target.value })}
                            />

						</div>

                        <TextArea label='Observações' onChange={e => {  }} placeholder="Digite aqui quaisquer informações adicionais" />

					</div>
					
					<div style={{display: 'flex', flexDirection: 'row', position: 'absolute', bottom: 25, right: 25}}>

						<Button title="Salvar o produto atual" onClick={()=> {
                            console.log(JSON.stringify(body))
                        }}>Salvar</Button>
						<Button title="Limpar o formulário para novo cadastro" onClick={()=> {window.alert('Ok');}}>Limpar</Button>

					</div>
				</TabPanel>
                <TabPanel>
                    <h3>Alterar dados</h3>
                </TabPanel>
			</Tabs>
		</ContentContainer>
    );
}

export default ProviderInterface;