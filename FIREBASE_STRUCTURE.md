# 📊 Estrutura do Firebase - AksTour Store

## 🗂️ Collections Separadas

O sistema usa **collections separadas** para não misturar os dados da loja com outros dados do site:

### 1. **`store_customers`** - Clientes da Loja
Armazena informações dos clientes que compram na loja.

```javascript
{
  // Document ID = Firebase Auth UID
  name: "João Silva",
  email: "joao@example.com",
  phone: "(11) 99999-9999",
  cpf: "123.456.789-00",
  address: {
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567"
  },
  accountType: "store_customer",
  stripeCustomerId: "cus_xxxxx", // ID do cliente no Stripe
  orders: ["order_id_1", "order_id_2"], // Array de IDs de pedidos
  lastPurchase: "2025-10-28T10:30:00Z",
  createdAt: "2025-10-28T10:00:00Z",
  updatedAt: "2025-10-28T10:30:00Z"
}
```

### 2. **`store_orders`** - Pedidos da Loja
Armazena todos os pedidos realizados.

```javascript
{
  orderId: "auto_generated_id",
  userId: "firebase_auth_uid", // Referência ao cliente
  paymentIntentId: "pi_xxxxx", // ID do pagamento no Stripe
  
  // Informações do pedido
  amount: 8999.00,
  status: "paid", // paid, processing, shipped, delivered, cancelled
  paymentStatus: "paid",
  paymentMethod: "card",
  
  // Items comprados
  items: [
    {
      id: 1,
      name: "Pacote Europa Clássica",
      description: "Paris, Londres e Roma - 15 dias",
      price: 8999.00,
      quantity: 1
    }
  ],
  
  // Informações do cliente (snapshot)
  customerInfo: {
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    address: { ... }
  },
  
  // Datas
  createdAt: "2025-10-28T10:30:00Z",
  shippedAt: null,
  deliveredAt: null
}
```

## 🔐 Firebase Authentication

O sistema usa o **Firebase Authentication** existente, mas identifica clientes da loja através do campo `accountType`.

### Fluxo de Autenticação:

1. **Cadastro**: Cliente cria conta via Firebase Auth
2. **Dados salvos**: Informações salvas em `store_customers`
3. **Login**: Usa mesma autenticação do Firebase
4. **Identificação**: Campo `accountType: "store_customer"` identifica cliente da loja

## 📋 Regras de Segurança do Firestore

Adicione estas regras no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Clientes da loja - só podem ler/escrever seus próprios dados
    match /store_customers/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Pedidos - clientes só podem ler seus próprios pedidos
    match /store_orders/{orderId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
      // Apenas admins podem atualizar status (adicionar regra de admin depois)
    }
  }
}
```

## 🛠️ Funções Disponíveis (customerService.js)

### Gerenciar Clientes:

```javascript
import { 
  saveCustomer, 
  getCustomer,
  getCustomerByEmail,
  checkEmailExists 
} from './services/customerService';

// Salvar/atualizar cliente
await saveCustomer(userId, customerData);

// Buscar cliente
const { data } = await getCustomer(userId);

// Buscar por email
const customer = await getCustomerByEmail('email@example.com');

// Verificar se email existe
const exists = await checkEmailExists('email@example.com');
```

### Gerenciar Pedidos:

```javascript
import { 
  saveOrder, 
  getCustomerOrders 
} from './services/customerService';

// Salvar pedido
await saveOrder(userId, orderData);

// Buscar pedidos do cliente
const { orders } = await getCustomerOrders(userId);
```

### Stripe Integration:

```javascript
import { updateStripeCustomerId } from './services/customerService';

// Associar cliente com Stripe
await updateStripeCustomerId(userId, 'cus_xxxxx');
```

## 🔄 Fluxo Completo de Compra

```
1. Cliente cria conta ou faz login
   ↓ (Firebase Auth)
   
2. Dados salvos em `store_customers`
   ↓
   
3. Cliente adiciona produtos ao carrinho
   ↓
   
4. Finaliza compra (Checkout)
   ↓
   
5. Pagamento processado (Stripe)
   ↓
   
6. Pedido salvo em `store_orders`
   ↓
   
7. Referência adicionada ao array `orders` do cliente
   ↓
   
8. Cliente recebe confirmação
```

## 📊 Queries Úteis

### Buscar pedidos por status:

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

const ordersQuery = query(
  collection(db, 'store_orders'),
  where('status', '==', 'paid')
);
const snapshot = await getDocs(ordersQuery);
```

### Buscar clientes cadastrados hoje:

```javascript
const today = new Date().toISOString().split('T')[0];

const customersQuery = query(
  collection(db, 'store_customers'),
  where('createdAt', '>=', today)
);
```

### Buscar pedidos por período:

```javascript
const ordersQuery = query(
  collection(db, 'store_orders'),
  where('createdAt', '>=', '2025-10-01'),
  where('createdAt', '<=', '2025-10-31')
);
```

## 🎯 Vantagens dessa Estrutura

✅ **Separação de dados**: Clientes da loja não se misturam com outros usuários  
✅ **Flexibilidade**: Fácil adicionar campos específicos da loja  
✅ **Escalabilidade**: Queries otimizadas para a loja  
✅ **Segurança**: Regras específicas para dados da loja  
✅ **Histórico**: Fácil rastrear pedidos e clientes  
✅ **Analytics**: Dados organizados para análises  

## 🔮 Próximas Melhorias

- [ ] Adicionar `store_reviews` para avaliações de produtos
- [ ] Adicionar `store_wishlist` para lista de desejos
- [ ] Adicionar `store_coupons` para cupons de desconto
- [ ] Criar dashboard admin para gerenciar pedidos
- [ ] Implementar notificações por email
- [ ] Adicionar rastreamento de envio

## 📞 Como Usar

Todos os componentes já estão configurados para usar essa estrutura:

- ✅ `CustomerAuth.jsx` - Salva em `store_customers`
- ✅ `CheckoutForm.jsx` - Salva em `store_orders`
- ✅ `customerService.js` - Funções helper prontas

Não precisa fazer mais nada! 🎉
