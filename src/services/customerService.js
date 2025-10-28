import { db } from '../firebase/firbase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Nome da collection de clientes da loja
const STORE_CUSTOMERS_COLLECTION = 'store_customers';
const STORE_ORDERS_COLLECTION = 'store_orders';

/**
 * Salvar ou atualizar informações do cliente
 */
export const saveCustomer = async (userId, customerData) => {
  try {
    const customerRef = doc(db, STORE_CUSTOMERS_COLLECTION, userId);
    
    await setDoc(customerRef, {
      ...customerData,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    return { success: false, error };
  }
};

/**
 * Buscar dados do cliente
 */
export const getCustomer = async (userId) => {
  try {
    const customerDoc = await getDoc(doc(db, STORE_CUSTOMERS_COLLECTION, userId));
    
    if (customerDoc.exists()) {
      return { success: true, data: customerDoc.data() };
    } else {
      return { success: false, error: 'Cliente não encontrado' };
    }
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return { success: false, error };
  }
};

/**
 * Salvar pedido do cliente
 */
export const saveOrder = async (userId, orderData) => {
  try {
    const orderRef = doc(collection(db, STORE_ORDERS_COLLECTION));
    
    const order = {
      orderId: orderRef.id,
      userId: userId,
      ...orderData,
      status: 'paid',
      createdAt: new Date().toISOString(),
    };

    // Salvar pedido na collection de pedidos
    await setDoc(orderRef, order);

    // Adicionar referência do pedido ao array do cliente
    const customerRef = doc(db, STORE_CUSTOMERS_COLLECTION, userId);
    await updateDoc(customerRef, {
      orders: arrayUnion(orderRef.id),
      lastPurchase: new Date().toISOString()
    });

    return { success: true, orderId: orderRef.id };
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    return { success: false, error };
  }
};

/**
 * Buscar pedidos do cliente
 */
export const getCustomerOrders = async (userId) => {
  try {
    const ordersQuery = query(
      collection(db, STORE_ORDERS_COLLECTION),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(ordersQuery);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, orders };
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return { success: false, error };
  }
};

/**
 * Atualizar Stripe Customer ID
 */
export const updateStripeCustomerId = async (userId, stripeCustomerId) => {
  try {
    const customerRef = doc(db, STORE_CUSTOMERS_COLLECTION, userId);
    await updateDoc(customerRef, {
      stripeCustomerId: stripeCustomerId,
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar Stripe ID:', error);
    return { success: false, error };
  }
};

/**
 * Verificar se email já existe na loja
 */
export const checkEmailExists = async (email) => {
  try {
    const customersQuery = query(
      collection(db, STORE_CUSTOMERS_COLLECTION),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(customersQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return false;
  }
};

/**
 * Buscar cliente por email
 */
export const getCustomerByEmail = async (email) => {
  try {
    const customersQuery = query(
      collection(db, STORE_CUSTOMERS_COLLECTION),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(customersQuery);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, data: { id: doc.id, ...doc.data() } };
    } else {
      return { success: false, error: 'Cliente não encontrado' };
    }
  } catch (error) {
    console.error('Erro ao buscar cliente por email:', error);
    return { success: false, error };
  }
};
