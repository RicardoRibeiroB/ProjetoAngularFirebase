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
  constructor(){
    this.getFuncionarios()
    this.getAllFuncionarios()
  }

  getFuncionarios(){
    fetch('http://localhost/exercicio/funcionario/listar_funcionario.php'
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
      this.mensagem = resp.mensagem;
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
}
