# 🧪 Guia de Testes Local

## Testar Serverless Functions Localmente

### Opção 1: Usando Vercel CLI (Recomendado)

1. **Instalar Vercel CLI:**
```bash
npm install -g vercel
```

2. **Fazer login:**
```bash
vercel login
```

3. **Rodar ambiente de desenvolvimento:**
```bash
vercel dev
```

Isso vai:
- Iniciar o React app na porta 3000
- Simular as serverless functions
- Usar suas variáveis de ambiente locais

4. **Testar:**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/create-payment-intent

### Opção 2: Testar API separadamente

Se quiser testar só a API, use cURL ou Postman:

```bash
# Testar criação de payment intent
curl -X POST http://localhost:3000/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.00,
    "cart": [{"id": 1, "name": "Teste", "price": 100, "quantity": 1}],
    "customerInfo": {"name": "Teste", "email": "teste@teste.com"}
  }'
```

## ✅ Checklist de Testes

### Antes do Deploy:

- [ ] `npm install` rodou sem erros
- [ ] Arquivo `.env` criado com chaves válidas
- [ ] `npm start` funciona
- [ ] Consegue adicionar produtos ao carrinho
- [ ] Modal de checkout abre
- [ ] Formulário do Stripe aparece

### Após Deploy na Vercel:

- [ ] Site carrega corretamente
- [ ] Pode navegar pelos produtos
- [ ] Carrinho funciona
- [ ] Checkout abre
- [ ] Consegue inserir dados do cartão
- [ ] Pagamento de teste funciona (4242 4242 4242 4242)
- [ ] Recebe confirmação de sucesso
- [ ] Pagamento aparece no Dashboard do Stripe

### Webhook (se configurado):

- [ ] Webhook está ativo no Stripe
- [ ] URL correta configurada
- [ ] Secret configurado na Vercel
- [ ] Eventos aparecem nos logs

## 🐛 Debug

### Ver logs na Vercel:
```
Dashboard > Seu Projeto > Functions > Logs em tempo real
```

### Ver logs do Stripe:
```
Dashboard > Developers > Logs
```

### Testar webhook manualmente:
No Dashboard do Stripe:
1. Webhooks > Seu endpoint
2. Clique em "Send test webhook"
3. Escolha "payment_intent.succeeded"
4. Veja o resultado

## 🔥 Comandos Úteis

```bash
# Instalar tudo
npm install

# Rodar localmente
npm start

# Rodar com Vercel CLI
vercel dev

# Build para produção
npm run build

# Deploy direto
vercel --prod

# Ver logs em tempo real
vercel logs --follow
```

## 📝 Notas Importantes

1. **Sempre teste com cartões de teste do Stripe**
2. **Não use cartões reais no modo test**
3. **Verifique os logs após cada teste**
4. **Configure webhooks depois de testar pagamentos**
5. **Só vá para produção depois de tudo funcionar em teste**
