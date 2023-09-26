
import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage {

  isLoading: boolean = false;
  funcionarios: any;
  insirir = 1;
  mensagem: any;
  filtro: any;
  constructor(){
    this.getFuncionarios()
    this.getAllFuncionarios()
  }

  getFuncionarios(){
    let funcionario = { CodFun: '' };

    fetch('http://localhost/exercicio/funcionario/listar_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response['funcionarios'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  getAllFuncionarios(){
    let funcionario = { CodFun: '' };

    fetch('http://localhost/exercicio/funcionario/listarTodos_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response['funcionarios'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  removerFuncionario(CodFun: any){
    this.isLoading = true;
		let funcionario = { CodFun: CodFun };

    fetch('http://localhost/exercicio/funcionario/remover_funcionario.php',
			{
			  method: 'DELETE',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
      this.funcionarios = dados['mensagem'];
      this.getAllFuncionarios();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  
  mostrarinput(valor: any){
    this.insirir = valor;
  }

  adicionarFuncionarios(form: any){
    let funcionarios = form;
    // console.log(form);
    this.isLoading = true;
    fetch('http://localhost/exercicio/funcionario/insirir_funcionario.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionarios)
    })
    .then(resp => resp.json())
    .then(resp=> {
      console.log(resp);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  atualizarFuncionario(form: any){
    let funcionarios = form;
    // console.log(form);
    this.isLoading = true;
    fetch('http://localhost/exercicio/funcionario/atualizar_funcionario.php',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(funcionarios)
    })
    .then(resp => resp.json())
    .then(resp=> {
      console.log(resp);
      this.mensagem = resp.mensagem;
      this.getAllFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  consultar(dados: any){
    let endpoint = '';
    let funcionario = { campo: dados.campo }
    if(this.filtro == "nome"){
      endpoint = 'http://localhost/exercicio/funcionario/consultar_funcionario_por_nome.php';
    }
    if(this.filtro == "cargo"){
      endpoint = 'http://localhost/exercicio/funcionario/consultar_funcionario_por_cargo.php';
    }
    if(this.filtro == "cidade"){
      endpoint = 'http://localhost/exercicio/funcionario/consultar_funcionario_por_cidade.php';
    }
    if(this.filtro == "telefone"){
      endpoint = 'http://localhost/exercicio/funcionario/consultar_funcionario_por_telefone.php';
    }
    fetch(endpoint,
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.funcionarios = response['funcionarios'];
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
   }
   setFiltro(dados: any){
    this.filtro = dados.detail.value;
    console.log(dados);
   }
}