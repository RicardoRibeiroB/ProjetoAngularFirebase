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

  constructor(){
    this.getFuncionarios()
  }

  getFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/exercicio/funcionario/listar_funcionario.php')
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
    
    fetch('http://localhost/exercicio/funcionario/remover_funcionario.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CodFun: CodFun}),
    })
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
      this.getFuncionarios();
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

  adicionarFuncionarios(){
    this.isLoading = true;
    fetch('http://localhost/exercicio/funcionario/insirir_funcionario.php')
    .then(insirir => insirir.json())
    .then(insirir => {
      console.log(insirir);
      this.funcionarios = insirir['insirir'];
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
