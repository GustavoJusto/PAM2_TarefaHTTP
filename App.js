import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import api from './components/api'
 class App extends Component{

    constructor(props){
      super(props);
      this.state = {
        nome:'',
        curso:'',
        id:''
      }
      this.consultar = this.consultar.bind(this);
      this.cadastrar = this.cadastrar.bind(this);
      this.editar = this.editar.bind(this);
      this.deletar = this.deletar.bind(this);
    }

    async consultar()
    {
       const response = await api.get('exemplo_api/pessoa/'+this.state.id);
       this.setState({
          nome: response.data.nome,
          curso: response.data.curso,
          id: response.data.id,
       });
    }

    cadastrar()
    {
      let bodyFormData = new FormData();
      bodyFormData.append('nome',`${this.state.nome}`);
      bodyFormData.append('curso',`${this.state.curso}`);

      api
      ({
        method:'post',
        url:'exemplo_api/pessoa',
        data: bodyFormData,
        headers:{"Content-Type":"multipart/form-data"}
      })
    }

    async editar()
    {
      const editar = await api.put(`exemplo_api/pessoa/${this.state.id}`,
      {nome:`${this.state.nome}`, curso:`${this.state.curso}`});
    }

    deletar()
    {
      api.delete(`exemplo_api/pessoa/${this.state.id}`);
    }

    render(){
      return (
        <View style={styles.container}>
          <Text style={styles.title}>CRUD API</Text>

          <TextInput keyboardType="numeric" placeholder="ID" style={styles.inputs} 
          onChangeText={(value)=>this.setState({id:value})}/>

          <View style={styles.btn}>
            <Button title="Consultar" onPress={this.consultar}/>
          </View>

          <TextInput placeholder="Nome..." style={styles.inputs} 
          value={this.state.nome} onChangeText={(value)=>this.setState({nome:value})}/>

          <TextInput placeholder="Curso..." style={styles.inputs}
          value={this.state.curso} onChangeText={(value)=>this.setState({curso:value})}/>

          <View style={styles.btn}>
            <Button title="Cadastrar" style={styles.btn} onPress={this.cadastrar}/>
          </View>

          <View style={styles.btn}>
            <Button title="Editar" style={styles.btn} onPress={this.editar}/>
          </View>

          <View style={styles.btn}>
            <Button title="Excluir" style={styles.btn} onPress={this.deletar}/>
          </View>  
        </View>
      );
    }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b1c5fc',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: 
  {
    fontSize: 30,
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    
  },

  inputs: 
  {
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'grey',
    width: 175,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  btn: 
  {
    marginTop: 10,
    width: 150,
    backgroundColor: "black",
  },
});

export default App;