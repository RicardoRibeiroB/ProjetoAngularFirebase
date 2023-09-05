import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  isLoading: boolean = false;
  clientes: any;

  getClientes(){
    this.isLoading = true;
    // res e o dados pode ser a mesma coisa
    // pode criar tudo em um then mas é melhor para programar e deixar o codigo manutavel no futuro
    fetch('http://localhost/api2/clientes/listar.php')
    .then(resp => resp.json())
    .then(dados => {
      this.clientes = dados['clientes'];
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
  removerCliente(CodCli: any){
    this.isLoading = true;
    // res e o dados pode ser a mesma coisa
    // pode criar tudo em um then mas é melhor para programar e deixar o codigo manutavel no futuro
    fetch('http://localhost/api2/clientes/remover.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CodCli: CodCli}),
    })
    .then(resp => resp.json())
    .then(dados => {
      console.log(dados);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      this.isLoading = false;
      console.log('processo finalizado');
    })
  }
}
