const axios = require('axios');
const { cnpj } = require('cpf-cnpj-validator');
const Parser = require('xml2js');
require('dotenv').config();
const Deals = require('./Deals')
const dealsObj = new Deals();

    module.exports = {
        async sendBling(data) {
            try {
            let xmlobj;
            let response = [];
            for (const item of data) {  
                xmlobj = {
                    pedido: {
                        cliente: {
                                nome: item.title,
                                tipoPessoa: "J",
                                endereco: "Rua Visconde de São Gabriel",
                                cpf_cnpj: cnpj.generate(),
                                ie_rg: "3067663000",
                                numero: "392",
                                complemento: "Sala 54",
                                bairro: "Cidade Alta",
                                cep: "95.700-000",
                                cidade: "Bento Gonçalves",
                                uf: "RS",
                                fone: "5481153376",
                                email: "teste@teste.com.br"
                            },
                            transporte: {
                                transportadora: "Transportadora XYZ",
                                tipo_frete: "R",
                                servico_correios: "SEDEX - CONTRATO",
                                dados_etiqueta: {
                                    nome: "Endereço de entrega",
                                    endereco: "Rua Visconde de São Gabriel",
                                    numero: "392",
                                    complemento: "Sala 59",
                                    municipio: "Bento Gonçalves",
                                    uf: "RS",
                                    cep: "95.700-000",
                                    bairro: "Cidade Alta"
                                },
                                volumes: {
                                    volumes: [
                                        {
                                            servico: "SEDEX - CONTRATO",
                                            codigoRastreamento: ""
                                        },
                                        {
                                            servico: "PAC - CONTRATO",
                                            codigoRastreamento: ""
                                        }
                                    ]
                                }
                            },
                            itens: {
                                item: [
                                    {
                                        codigo: "001",
                                        descricao: "Caneta 001",
                                        un: "Pç",
                                        qtde: "10",
                                        vlr_unit: "1.68"
                                    },
                                    {
                                        codigo: "002",
                                        descricao: "Caderno 002",
                                        un: "Un",
                                        qtde: "3",
                                        vlr_unit: "3.75"
                                    },
                                    {
                                        codigo: "003",
                                        descricao: "Teclado 003",
                                        un: "Cx",
                                        qtde: "7",
                                        vlr_unit: "18.65"
                                    }
                                ]
                            },
                            parcelas: {
                                parcela: [
                                    {
                                        data: item.won_time,
                                        vlr: item.value,
                                        obs: "Teste obs 1"
                                    }
                                    
                                ]
                            },
                            vlr_frete: "15",
                            vlr_desconto: "10",
                            obs: "Testando o campo observações do pedido",
                            obs_internas: "Testando o campo observações internas do pedido"
                        }           
                }
                await dealsObj.update(item._id, item.title, item.value, item.status, item.won_time, 'integrated')
                let builder = new Parser.Builder();
                let xmldata = builder.buildObject(xmlobj);
                let xmlEncodeURI = encodeURI(xmldata);
                const res = await axios.post(process.env.URL_BLING + `?apikey=${process.env.TOKEN_BLING}&xml=${xmlEncodeURI}`);
                response.push(res.data)              
            };
            return response
            } catch (e) {
               return e 
            };        
        },
    };