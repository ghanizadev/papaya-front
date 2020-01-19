import React, {useState} from 'react';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import {Input, Select, Button, TextArea, Search} from '../../components';
import 'react-tabs/style/react-tabs.css';

const ClientsInterface = props => {
    const [userData, setUserData] = useState([
        'Jean',
        'Ivona'
    ]);

    return (
		<Tabs>
			<TabList>
				<Tab>Cadastro de cliente</Tab>
				<Tab>Alterar dados</Tab>
				<Tab>Alterar Cliente</Tab>
			</TabList>

			<TabPanel style={{padding: 25}}>
            <div style={{width: '100%', display: 'flex', margin:'auto', flexDirection: 'column'}}>
                    <h3>Cliente</h3>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Input
                        proportion={5} 
                        label="Nome"
                        placeholder="Digite aqui o nome do fornecedor"
                        />

                        <Input
                        proportion={1}
                        label='Código'
                        type='date'
                        placeholder="01/01/1970"
                        size={5}
                        /> 
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                        proportion={4}
                        label="Endereço"
                        placeholder="Digite aqui o endereço do fornecedor"
                    />

                    <Input
                        proportion={1}
                        label="Número"
                    />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                        proportion={1.5}
                        label="Bairro"
                        placeholder="Digite aqui o bairro"
                    />

                    <Input
                        proportion={1.5}
                        label="Cidade"
                        placeholder="Digite aqui a cidade"
                    />

                    <Select proportion={1.5} label="Estado" placeholder="Selecione" >
                    
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
                    />
                    </div>


                    <div style={{display: 'flex', flexDirection: 'row'}}>

                        <Input
                            label="CPF"
                            placeholder="Digite aqui o CNPJ"
                        />

                        <Input
                            label="Email"
                            placeholder="Digite aqui o endereço do fornecedor"
                            />

                        <Input
                            label="Telefone"
                            placeholder="Digite aqui o telefone do fornecedor"
                        />

                    </div>

                    <TextArea label='Observações' onChange={e => {  }} placeholder="Digite aqui quaisquer informações adicionais" />

                </div>
                
                <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: 25, bottom: 25}}>

                    <Button title="Limpar o formulário para novo cadastro">Limpar</Button>
                    <Button title="Salvar o produto atual" >Salvar</Button>

                </div>
			</TabPanel>
			<TabPanel style={{padding: 25}}>
            <div style={{width: '100%', display: 'flex', margin:'auto', flexDirection: 'column'}}>

                    <h3>Pesquisar cliente</h3>
                    <Search
                        proportion={1} 
                        label="Pesquisar"
                        placeholder="Digite aqui o nome, email ou CPF do cliente"
                        data={userData}
                    />

                    <h3>Alterar dados</h3>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Input
                        proportion={5} 
                        label="Nome"
                        placeholder="Digite aqui o nome do fornecedor"
                        />

                        <Input
                        proportion={1}
                        label='Código'
                        type='date'
                        placeholder="01/01/1970"
                        size={5}
                        /> 
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                        proportion={4}
                        label="Endereço"
                        placeholder="Digite aqui o endereço do fornecedor"
                    />

                    <Input
                        proportion={1}
                        label="Número"
                    />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Input
                        proportion={1.5}
                        label="Bairro"
                        placeholder="Digite aqui o bairro"
                    />

                    <Input
                        proportion={1.5}
                        label="Cidade"
                        placeholder="Digite aqui a cidade"
                    />

                    <Select proportion={1.5} label="Estado" placeholder="Selecione" >
                    
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
                    />
                    </div>


                    <div style={{display: 'flex', flexDirection: 'row'}}>

                        <Input
                            label="CPF"
                            placeholder="Digite aqui o CNPJ"
                        />

                        <Input
                            label="Email"
                            placeholder="Digite aqui o endereço do fornecedor"
                            />

                        <Input
                            label="Telefone"
                            placeholder="Digite aqui o telefone do fornecedor"
                        />

                    </div>

                    <TextArea label='Observações' onChange={e => {  }} placeholder="Digite aqui quaisquer informações adicionais" />

                </div>
                
                <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: 25, bottom: 25}}>

                    <Button title="Limpar o formulário para novo cadastro">Deletar</Button>
                    <Button title="Salvar o produto atual" >Salvar</Button>

                </div>
			</TabPanel>
            <TabPanel style={{padding: 25}}>
				
            </TabPanel>
		</Tabs>
    );
}

export default ClientsInterface;