# 🚀 Guia Completo de Deploy na Vercel com Stripe

## 📋 Estrutura do Projeto

```
aksTour/
├── api/                              # Serverless Functions (Backend)
│   ├── create-payment-intent.js     # Criar pagamentos
│   └── stripe-webhook.js            # Receber eventos do Stripe
├── src/
│   └── Store.jsx                    # Frontend da loja
├── vercel.json                      # Configuração da Vercel
├── .env.example                     # Exemplo de variáveis
└── package.json
```

## 🔧 Passo 1: Configurar Stripe

### 1.1. Criar conta no Stripe
1. Acesse https://stripe.com
2. Crie uma conta (gratuita)
3. Acesse o Dashboard

### 1.2. Obter chaves de API
1. Vá em: https://dashboard.stripe.com/test/apikeys
2. Copie:
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...) - clique em "Reveal test key"

## 🌍 Passo 2: Configurar Variáveis de Ambiente Localmente

### 2.1. Criar arquivo .env na raiz do projeto:

```env
# Frontend
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica_aqui

# Backend (Serverless Functions)
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
```

### 2.2. Adicionar .env ao .gitignore:

```
# .gitignore
.env
.env.local
```

## 🚀 Passo 3: Deploy na Vercel

### 3.1. Instalar Vercel CLI (Opcional):

```bash
npm install -g vercel
```

### 3.2. Via Dashboard da Vercel (Recomendado):

1. **Acesse**: https://vercel.com
2. **Login** com GitHub/GitLab/Bitbucket
3. **Clique em** "Add New Project"
4. **Importe** seu repositório do GitHub
5. **Configure** o projeto:
   - **Framework Preset**: Create React App
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3. Configurar Variáveis de Ambiente na Vercel:

1. No dashboard do projeto, vá em **Settings**
2. Clique em **Environment Variables**
3. Adicione:

```
REACT_APP_STRIPE_PUBLISHABLE_KEY = pk_test_sua_chave_aqui
STRIPE_SECRET_KEY = sk_test_sua_chave_aqui
```

4. Selecione todos os ambientes (Production, Preview, Development)
5. Clique em **Save**

### 3.4. Deploy:

```bash
# Via CLI
vercel

# Ou faça push no GitHub
git add .
git commit -m "feat: add stripe payment"
git push origin main
```

A Vercel vai automaticamente fazer o deploy! 🎉

## 🔗 Passo 4: Como Funciona na Vercel

### Arquitetura:

```
Frontend (React)
    ↓
    ↓ fetch('/api/create-payment-intent')
    ↓
Vercel Serverless Function
    ↓
    ↓ stripe.paymentIntents.create()
    ↓
Stripe API
```

### URLs:

- **Produção**: `https://seu-site.vercel.app`
- **API**: `https://seu-site.vercel.app/api/create-payment-intent`

### Serverless Functions:

- Executam automaticamente quando chamadas
- Não precisam de servidor 24/7
- Escaláveis automaticamente
- Gratuitas até 100GB-hours/mês

## 🔔 Passo 5: Configurar Webhooks (Opcional mas Recomendado)

### 5.1. No Dashboard do Stripe:

1. Vá em: https://dashboard.stripe.com/test/webhooks
2. Clique em **"Add endpoint"**
3. **Endpoint URL**: `https://seu-site.vercel.app/api/stripe-webhook`
4. **Events to send**: Selecione:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
5. Clique em **"Add endpoint"**
6. Copie o **Signing secret** (whsec_...)

### 5.2. Adicionar na Vercel:

Volte nas Environment Variables e adicione:

```
STRIPE_WEBHOOK_SECRET = whsec_sua_webhook_secret_aqui
```

## 🧪 Passo 6: Testar

### 6.1. Testar localmente:

```bash
npm start
```

Acesse: http://localhost:3000

### 6.2. Cartões de teste:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- **CVV**: qualquer 3 dígitos
- **Data**: qualquer data futura

### 6.3. Verificar logs:

**Vercel**:
- Dashboard > Projeto > Functions
- Veja logs em tempo real

**Stripe**:
- Dashboard > Developers > Logs
- Veja todas as requisições

## 🔒 Passo 7: Segurança

### ✅ Checklist:

- [x] Secret key está apenas no backend (variável de ambiente)
- [x] .env está no .gitignore
- [x] Webhooks validam assinatura
- [x] CORS configurado corretamente
- [x] Validação de dados no backend

## 📊 Passo 8: Monitorar

### Dashboard Stripe:

- **Pagamentos**: https://dashboard.stripe.com/test/payments
- **Clientes**: https://dashboard.stripe.com/test/customers
- **Logs**: https://dashboard.stripe.com/test/logs

### Dashboard Vercel:

- **Analytics**: Ver tráfego e performance
- **Functions**: Ver execuções das APIs
- **Logs**: Debug de erros

## 🎯 Passo 9: Ir para Produção

### Quando estiver pronto:

1. **No Stripe**:
   - Ative modo LIVE
   - Obtenha chaves de produção (pk_live_..., sk_live_...)
   - Complete informações da empresa

2. **Na Vercel**:
   - Atualize Environment Variables com chaves LIVE
   - Configure webhooks de produção

3. **Testes finais**:
   - Use cartão real (será cobrado)
   - Teste fluxo completo
   - Verifique emails de confirmação

## 🆘 Troubleshooting

### Erro: "Invalid API Key"
- Verifique se as variáveis de ambiente estão corretas na Vercel
- Reinicie o deploy após adicionar variáveis

### Erro: "CORS"
- Verifique o arquivo `vercel.json`
- Confirme que está fazendo fetch para URL correta

### Erro: "Webhook signature verification failed"
- Verifique se STRIPE_WEBHOOK_SECRET está configurado
- Teste webhook no Dashboard do Stripe

### API não funciona:
- Verifique se arquivos estão na pasta `/api`
- Veja logs na Vercel Dashboard > Functions
- Teste localmente primeiro

## 📚 Recursos Úteis

- [Documentação Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

## 💰 Custos

### Vercel:
- **Hobby (Free)**: 
  - 100GB bandwidth
  - 100GB-hours serverless functions
  - Perfeito para começar

### Stripe:
- **Sem mensalidade**
- **2.99% + R$ 0,39** por transação aprovada
- Só paga quando vende

## ✅ Checklist Final

- [ ] Conta Stripe criada
- [ ] Chaves de API obtidas
- [ ] Variáveis de ambiente configuradas localmente
- [ ] Teste local funcionando
- [ ] Código no GitHub
- [ ] Projeto importado na Vercel
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Deploy realizado
- [ ] Teste em produção com cartão de teste
- [ ] Webhooks configurados (opcional)
- [ ] Pronto para receber pagamentos! 🎉

---

## 🎓 Próximos Passos

Depois que tudo estiver funcionando, você pode:

1. **Adicionar formulário de dados do cliente** (nome, email, CPF)
2. **Salvar pedidos no Firebase/MongoDB**
3. **Enviar emails de confirmação**
4. **Gerar PDFs de comprovante**
5. **Criar painel admin para ver vendas**
6. **Adicionar mais métodos de pagamento** (Pix, boleto via Stripe)

Qualquer dúvida, estou aqui para ajudar! 🚀
