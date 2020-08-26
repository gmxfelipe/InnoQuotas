# GRUPO - CGO

- Nomes: {
  _ "Bruno Rocha Roque";
  _ "Cassiel Rattes Cortez";
  _ "Felipe Augusto Gomes de Oliveira";
  _ "Guilherme Perez";
  }

// D O C U M E N T A Ç Ã O \\

- Usuários: Usuário_Edificações( Arquiteto, Engenheiro, etc...);
- Banco de Dados: {
  _ Orçamento: id, planta_id, custo_material e custo_operacao;
  _ Componentes: id, orça_id, material, custo_material, custo_operacao, descricao e tipo; \* Planta: id, cliente, responsavel, arquivo, metragem e observacoes;
  }

- Funcionalidades: {
  _ Calculos precisos;
  _ Informações da planta;
  _ Cotação de Previsto X Real;
  _ Visualização de graficos;git
  }

// BIZUS

Para pegar o sql e guardá-lo em um arquivo, use o mysqldump. Para mais informações:
https://www.devmedia.com.br/backup-no-mysql-com-mysqldump-parte-1/7483

//Imagens\\

https://i.ibb.co/4WkqSm3/Elder-TCC-1.png
https://i.ibb.co/KyyDx6B/IMG-1380.jpg
https://i.ibb.co/4Tk8rt1/IMG-1392.jpg
https://i.ibb.co/VJymTtr/IMG-1383.jpg
https://i.ibb.co/K0BWftZ/IMG-1390.jpg

"dependencies": {
"body-parser": "^1.19.0",
"chart.js": "^2.9.2",
"cookie-parser": "^1.4.4",
"cors": "^2.8.5",
"crypto": "^1.0.1",
"express": "^4.17.1",
"express-session": "^1.17.1",
"jsonwebtoken": "^8.5.1",
"morgan": "^1.10.0",
"mysql": "^2.17.1"
},
"devDependencies": {
"nodemon": "^1.19.4"
}
