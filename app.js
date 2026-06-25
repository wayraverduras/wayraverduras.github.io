// Datos de los productos de Wayra Verduras
const products = [
    {
        id: 1,
        name: "Berenjena al Horno",
        subtitle: "Deliciosas rebanadas horneadas listas para consumir",
        category: "cocidas",
        badge: "Cocida al Horno",
        image: "berenjena.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 2,
        name: "Calabaza",
        subtitle: "Cubos tiernos al vapor, ideales para puré o ensalada",
        category: "cocidas",
        badge: "Cocida",
        image: "calabaza.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 3,
        name: "Remolacha Rallada",
        subtitle: "Fresca y finamente rallada, lista para condimentar",
        category: "ralladas",
        badge: "Rallada Cruda",
        image: "remolacha_rallada.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 4,
        name: "Remolacha Hervida",
        subtitle: "Tiernas remolachas listas para tus ensaladas",
        category: "cocidas",
        badge: "Cocida",
        image: "remolacha_hervida.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 5,
        name: "Pimiento Rojo Crudo",
        subtitle: "Tiras frescas listas para saltear o ensaladas",
        category: "ralladas",
        badge: "Crudo",
        image: "pimiento_rojo.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 6,
        name: "Zanahoria Rallada",
        subtitle: "Zanahoria fresca rallada lista para comer",
        category: "ralladas",
        badge: "Rallada Cruda",
        image: "zanahoria_rallada.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 7,
        name: "Zanahoria Hervida",
        subtitle: "Rodajas tiernas de zanahoria cocidas en su punto",
        category: "cocidas",
        badge: "Cocida",
        image: "zanahoria_hervida.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 8,
        name: "Chauchas",
        subtitle: "Chauchas seleccionadas y cocidas al vapor",
        category: "cocidas",
        badge: "Cocida",
        image: "chauchas.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 9,
        name: "Lentejas",
        subtitle: "Legumbres cocidas y tiernas listas para tus guisos o ensaladas",
        category: "legumbres",
        badge: "Cocida",
        image: "lentejas.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 10,
        name: "Choclo Desgranado",
        subtitle: "Granos de choclo amarillo dulce cocidos al vapor",
        category: "cocidas",
        badge: "Cocida",
        image: "choclo.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    },
    {
        id: 11,
        name: "Brócoli",
        subtitle: "Brócoli fresco cocido al vapor",
        category: "cocidas",
        badge: "Cocido",
        image: "brocoli.jpg",
        prices: { "250g": 4000, "500g": 8000 }
    },
    {
        id: 12,
        name: "Coliflor",
        subtitle: "Flores de coliflor tiernas al vapor",
        category: "cocidas",
        badge: "Cocida",
        image: "coliflor.jpg",
        prices: { "250g": 4000, "500g": 8000 }
    },
    {
        id: 13,
        name: "Cebolla Cruda",
        subtitle: "Cebolla blanca picada fina, lista para cocinar",
        category: "ralladas",
        badge: "Cruda Picada",
        image: "cebolla.jpg",
        prices: { "250g": 3000, "500g": 5000 }
    }
];

// Estado global del carrito (Carga de localStorage si existe)
let cart = JSON.parse(localStorage.getItem('wayra_cart')) || [];

// Teléfono de contacto (WhatsApp)
const WHATSAPP_PHONE = "5493412142916"; // Formato internacional para Argentina/Rosario (549 + 341...)

// Inicialización de la aplicación
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCart();
    setupEventListeners();
});

// Renderizar la grilla de productos
function renderProducts(filter = "all") {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    const filtered = filter === "all" 
        ? products 
        : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card animate-fade-in";
        card.setAttribute("data-category", product.category);

        // Precios por defecto
        const defaultWeight = "500g";
        const initialPrice = product.prices[defaultWeight];

        card.innerHTML = `
            <span class="product-badge">${product.badge}</span>
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='wayra_logo.png'; this.className='product-image-placeholder';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-subtitle">${product.subtitle}</p>
                
                <div class="weight-selector">
                    <div class="weight-option">
                        <input type="radio" id="w-250-${product.id}" name="weight-${product.id}" value="250g" data-product-id="${product.id}">
                        <label for="w-250-${product.id}" class="weight-label">250g</label>
                    </div>
                    <div class="weight-option">
                        <input type="radio" id="w-500-${product.id}" name="weight-${product.id}" value="500g" checked data-product-id="${product.id}">
                        <label for="w-500-${product.id}" class="weight-label">500g</label>
                    </div>
                </div>

                <div class="product-price-row">
                    <div class="price-container">
                        <span class="price-label">Precio</span>
                        <span class="price-value" id="price-display-${product.id}">$${initialPrice.toLocaleString('es-AR')}</span>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}" title="Agregar al pedido">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Añadir event listeners para los selectores de peso y botones de agregar
    setupProductCardInteractions();
}

// Configurar interacciones dentro de las tarjetas de producto
function setupProductCardInteractions() {
    // Escuchar el cambio de peso para actualizar el precio mostrado en tiempo real
    document.querySelectorAll(".weight-option input").forEach(radio => {
        radio.addEventListener("change", (e) => {
            const productId = parseInt(e.target.getAttribute("data-product-id"));
            const selectedWeight = e.target.value;
            const product = products.find(p => p.id === productId);
            const priceDisplay = document.getElementById(`price-display-${productId}`);
            
            if (product && priceDisplay) {
                const newPrice = product.prices[selectedWeight];
                priceDisplay.textContent = `$${newPrice.toLocaleString('es-AR')}`;
            }
        });
    });

    // Escuchar clics en botones de agregar al carrito
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const btn = e.currentTarget;
            const productId = parseInt(btn.getAttribute("data-product-id"));
            
            // Obtener el peso seleccionado para este producto
            const selectedWeightRadio = document.querySelector(`input[name="weight-${productId}"]:checked`);
            const weight = selectedWeightRadio ? selectedWeightRadio.value : "500g";
            
            addToCart(productId, weight);
            
            // Animación temporal en el botón
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
            btn.style.backgroundColor = '#1d5f37';
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
                btn.style.backgroundColor = '';
            }, 1000);
        });
    });
}

// Agregar un producto al carrito
function addToCart(productId, weight) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const price = product.prices[weight];
    
    // Buscar si el producto con ese mismo peso ya está en el carrito
    const existingIndex = cart.findIndex(item => item.id === productId && item.weight === weight);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            weight: weight,
            price: price,
            image: product.image,
            quantity: 1
        });
    }

    // Persistir y actualizar interfaz
    saveCart();
    updateCart();
    
    // Animación de pulso en el botón del carrito
    pulseCartButtons();
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('wayra_cart', JSON.stringify(cart));
}

// Cambiar la cantidad de un artículo en el carrito
function changeQuantity(productId, weight, change) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.weight === weight);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }

    saveCart();
    updateCart();
}

// Eliminar un artículo del carrito
function removeItem(productId, weight) {
    cart = cart.filter(item => !(item.id === productId && item.weight === weight));
    saveCart();
    updateCart();
}

// Animar los botones del carrito ante adiciones
function pulseCartButtons() {
    const mobBtn = document.getElementById("mobile-cart-toggle");
    mobBtn.classList.remove("pulse");
    void mobBtn.offsetWidth; // Trigger reflow para reiniciar la animación
    mobBtn.classList.add("pulse");
}

// Actualizar toda la interfaz del carrito (Sidebar y Mobile Modal)
function updateCart() {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    // Actualizar insignias de conteo
    document.getElementById("cart-count-badge").textContent = totalQty;
    document.getElementById("mobile-cart-badge").textContent = totalQty;

    // Calcular montos de dinero
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Obtener costo de envío actual
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const deliveryCost = deliveryMethod === "home" ? 1000 : 0;
    const grandTotal = subtotal + deliveryCost;

    // Actualizar montos en la vista
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toLocaleString('es-AR')}`;
    document.getElementById("cart-delivery-cost").textContent = deliveryCost > 0 ? `+$${deliveryCost.toLocaleString('es-AR')}` : "Gratis";
    document.getElementById("cart-total").textContent = `$${grandTotal.toLocaleString('es-AR')}`;

    // Mostrar u ocultar el panel de totales y formulario según si hay elementos
    const totalsPanel = document.getElementById("cart-totals-panel");
    const emptyMsg = document.querySelector(".empty-cart-message");
    
    if (cart.length > 0) {
        totalsPanel.style.display = "block";
        if (emptyMsg) emptyMsg.style.display = "none";
    } else {
        totalsPanel.style.display = "none";
        if (emptyMsg) emptyMsg.style.display = "block";
    }

    // Renderizar la lista de elementos en el contenedor del carrito (sidebar)
    renderCartList("cart-items-container");
    
    // Renderizar la lista en el contenedor del modal móvil
    renderCartList("cart-modal-body-content", true);
}

// Renderizar la lista de ítems del carrito en un elemento específico
function renderCartList(containerId, isModal = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Si es el modal, primero copiamos el estado de vacío
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Tu carrito está vacío.<br>Agregá algunos productos para comenzar.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    
    const listWrapper = document.createElement("div");
    listWrapper.className = "cart-list-items";

    cart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='wayra_logo.png';">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <span class="cart-item-weight">${item.weight}</span>
                <div class="cart-item-price-qty">
                    <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                    <div class="qty-controls">
                        <button class="qty-btn minus-btn" data-id="${item.id}" data-weight="${item.weight}">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn plus-btn" data-id="${item.id}" data-weight="${item.weight}">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" data-weight="${item.weight}" title="Eliminar del pedido">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        listWrapper.appendChild(itemEl);
    });

    container.appendChild(listWrapper);

    // Si es el modal, también le agregamos los totales y el formulario para que sea autocontenido en móviles
    if (isModal) {
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
        const deliveryCost = deliveryMethod === "home" ? 1000 : 0;
        const grandTotal = subtotal + deliveryCost;
        const paymentRadio = document.querySelector('input[name="payment-method"]:checked');
        const paymentMethod = paymentRadio ? paymentRadio.value : 'cash';

        const modalTotals = document.createElement("div");
        modalTotals.className = "cart-totals-panel";
        modalTotals.innerHTML = `
            <div class="totals-row">
                <span>Subtotal Productos:</span>
                <strong>$${subtotal.toLocaleString('es-AR')}</strong>
            </div>
            
            <div class="delivery-options">
                <label class="delivery-label">Método de Entrega:</label>
                <div class="delivery-radio-group">
                    <label class="delivery-radio-card ${deliveryMethod === 'home' ? 'active' : ''}" id="modal-delivery-home-label">
                        <input type="radio" name="modal-delivery-method" value="home" ${deliveryMethod === 'home' ? 'checked' : ''}>
                        <div class="delivery-card-content">
                            <i class="fa-solid fa-motorcycle"></i>
                            <div>
                                <span class="option-title">Envío a Domicilio</span>
                                <span class="option-price">+$1.000</span>
                            </div>
                        </div>
                    </label>
                    <label class="delivery-radio-card ${deliveryMethod === 'pickup' ? 'active' : ''}" id="modal-delivery-pickup-label">
                        <input type="radio" name="modal-delivery-method" value="pickup" ${deliveryMethod === 'pickup' ? 'checked' : ''}>
                        <div class="delivery-card-content">
                            <i class="fa-solid fa-house-user"></i>
                            <div>
                                <span class="option-title">Retiro en Casa</span>
                                <span class="option-price">Gratis</span>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <div class="totals-row" style="display: ${deliveryCost > 0 ? 'flex' : 'none'};">
                <span>Costo de Envío:</span>
                <strong>+$${deliveryCost.toLocaleString('es-AR')}</strong>
            </div>
            
            <div class="totals-row total-final-row">
                <span>Total Estimado:</span>
                <strong style="color: var(--accent-green-dark); font-size: 1.5rem;">$${grandTotal.toLocaleString('es-AR')}</strong>
            </div>

            <form id="modal-checkout-form" class="checkout-form">
                <h3><i class="fa-solid fa-user-pen"></i> Datos para el Pedido</h3>
                
                <div class="form-group">
                    <label for="modal-client-name">Nombre y Apellido *</label>
                    <input type="text" id="modal-client-name" placeholder="Ej. María López" value="${document.getElementById('client-name').value}" required>
                </div>

                <div class="form-group" id="modal-address-group" style="display: ${deliveryMethod === 'home' ? 'block' : 'none'}">
                    <label for="modal-client-address">Dirección de Entrega (en Rosario) *</label>
                    <input type="text" id="modal-client-address" placeholder="Ej. Pellegrini 1500, Piso 2 B" value="${document.getElementById('client-address').value}" ${deliveryMethod === 'home' ? 'required' : ''}>
                </div>

                <div class="form-group">
                    <label class="delivery-label">Método de Pago *</label>
                    <div class="payment-radio-group">
                        <label class="payment-radio-card ${paymentMethod === 'cash' ? 'active' : ''}" id="modal-payment-cash-label">
                            <input type="radio" name="modal-payment-method" value="cash" ${paymentMethod === 'cash' ? 'checked' : ''} required>
                            <div class="payment-card-content">
                                <i class="fa-solid fa-money-bill-1-wave"></i>
                                <div>
                                    <span class="payment-option-title">Efectivo</span>
                                </div>
                            </div>
                        </label>
                        <label class="payment-radio-card ${paymentMethod === 'transfer' ? 'active' : ''}" id="modal-payment-transfer-label">
                            <input type="radio" name="modal-payment-method" value="transfer" ${paymentMethod === 'transfer' ? 'checked' : ''} required>
                            <div class="payment-card-content">
                                <i class="fa-solid fa-building-columns"></i>
                                <div>
                                    <span class="payment-option-title">Transferencia</span>
                                    <span class="payment-option-subtitle">alias: wayra.verduras</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="modal-client-notes">Notas / Aclaraciones (Opcional)</label>
                    <textarea id="modal-client-notes" placeholder="Ej. Tocar timbre 'B', o retirar el sábado..." rows="2">${document.getElementById('client-notes').value}</textarea>
                </div>

                <button type="submit" class="submit-btn">
                    <i class="fa-brands fa-whatsapp"></i> Enviar Pedido por WhatsApp
                </button>
            </form>
        `;
        container.appendChild(modalTotals);

        // Vincular los listeners del formulario modal
        setupModalFormEvents();
    }

    // Registrar listeners para botones de cantidad y eliminación dentro del contenedor renderizado
    container.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const weight = btn.getAttribute("data-weight");
            changeQuantity(id, weight, -1);
        });
    });

    container.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const weight = btn.getAttribute("data-weight");
            changeQuantity(id, weight, 1);
        });
    });

    container.querySelectorAll(".cart-item-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const weight = btn.getAttribute("data-weight");
            removeItem(id, weight);
        });
    });
}

// Configurar los manejadores de eventos generales del sitio
function setupEventListeners() {
    // Filtros de Categorías
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            const filter = e.target.getAttribute("data-filter");
            renderProducts(filter);
        });
    });

    // Control de entrega en la barra lateral (Desktop)
    const homeMethod = document.querySelector('input[name="delivery-method"][value="home"]');
    const pickupMethod = document.querySelector('input[name="delivery-method"][value="pickup"]');
    const addressGroup = document.getElementById("address-group");
    const clientAddressInput = document.getElementById("client-address");

    const handleDeliveryChange = (method) => {
        document.getElementById("delivery-home-label").classList.toggle("active", method === "home");
        document.getElementById("delivery-pickup-label").classList.toggle("active", method === "pickup");
        
        if (method === "home") {
            addressGroup.style.display = "block";
            clientAddressInput.setAttribute("required", "required");
            document.getElementById("delivery-cost-row").style.display = "flex";
        } else {
            addressGroup.style.display = "none";
            clientAddressInput.removeAttribute("required");
            document.getElementById("delivery-cost-row").style.display = "none";
        }
        updateCart();
    };

    homeMethod.addEventListener("change", () => handleDeliveryChange("home"));
    pickupMethod.addEventListener("change", () => handleDeliveryChange("pickup"));

    // Control de pago en la barra lateral (Desktop)
    const cashPayment = document.querySelector('input[name="payment-method"][value="cash"]');
    const transferPayment = document.querySelector('input[name="payment-method"][value="transfer"]');

    const handlePaymentChange = (method) => {
        document.getElementById("payment-cash-label").classList.toggle("active", method === "cash");
        document.getElementById("payment-transfer-label").classList.toggle("active", method === "transfer");
        // Sincronizar con el modal si estuviera abierto
        const modalCashLabel = document.getElementById("modal-payment-cash-label");
        const modalTransferLabel = document.getElementById("modal-payment-transfer-label");
        if (modalCashLabel && modalTransferLabel) {
            modalCashLabel.classList.toggle("active", method === "cash");
            modalTransferLabel.classList.toggle("active", method === "transfer");
            const modalCashRadio = document.querySelector('input[name="modal-payment-method"][value="cash"]');
            const modalTransferRadio = document.querySelector('input[name="modal-payment-method"][value="transfer"]');
            if (modalCashRadio && modalTransferRadio) {
                if (method === "cash") modalCashRadio.checked = true;
                else modalTransferRadio.checked = true;
            }
        }
    };

    if (cashPayment && transferPayment) {
        cashPayment.addEventListener("change", () => handlePaymentChange("cash"));
        transferPayment.addEventListener("change", () => handlePaymentChange("transfer"));
    }

    // Guardar cambios sincrónicos de entradas entre barra lateral y modal
    syncInputsBetweenSidebarAndModal();

    // Enviar formulario desde barra lateral (Desktop)
    const form = document.getElementById("checkout-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendOrderViaWhatsApp();
    });

    // Modal de Carrito en Móviles
    const mobileCartToggle = document.getElementById("mobile-cart-toggle");
    const closeCartModal = document.getElementById("close-cart-modal");
    const cartModalOverlay = document.getElementById("cart-modal-overlay");

    mobileCartToggle.addEventListener("click", () => {
        cartModalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden"; // Desactivar scroll fondo
    });

    const closeOverlay = () => {
        cartModalOverlay.style.display = "none";
        document.body.style.overflow = ""; // Restaurar scroll
    };

    closeCartModal.addEventListener("click", closeOverlay);
    
    // Cerrar modal al hacer clic en el fondo gris translúcido
    cartModalOverlay.addEventListener("click", (e) => {
        if (e.target === cartModalOverlay) {
            closeOverlay();
        }
    });
}

// Sincronizar inputs de texto entre la barra lateral y el modal
function syncInputsBetweenSidebarAndModal() {
    const sidebarName = document.getElementById("client-name");
    const sidebarAddress = document.getElementById("client-address");
    const sidebarNotes = document.getElementById("client-notes");

    const sync = (source, targetId) => {
        if (!source) return;
        source.addEventListener("input", (e) => {
            const target = document.getElementById(targetId);
            if (target) target.value = e.target.value;
        });
    };

    sync(sidebarName, "modal-client-name");
    sync(sidebarAddress, "modal-client-address");
    sync(sidebarNotes, "modal-client-notes");
}

// Configurar los eventos internos en el formulario dentro del Modal (Móviles)
function setupModalFormEvents() {
    const modalHomeRadio = document.querySelector('input[name="modal-delivery-method"][value="home"]');
    const modalPickupRadio = document.querySelector('input[name="modal-delivery-method"][value="pickup"]');
    const modalAddressGroup = document.getElementById("modal-address-group");
    const modalAddressInput = document.getElementById("modal-client-address");

    const handleModalDeliveryChange = (method) => {
        // Actualizar el radio button original de la barra lateral para sincronizar
        const originalRadio = document.querySelector(`input[name="delivery-method"][value="${method}"]`);
        if (originalRadio) {
            originalRadio.checked = true;
            // Disparar el evento change para sincronizar el estado
            originalRadio.dispatchEvent(new Event("change"));
        }
    };

    if (modalHomeRadio && modalPickupRadio) {
        modalHomeRadio.addEventListener("change", () => handleModalDeliveryChange("home"));
        modalPickupRadio.addEventListener("change", () => handleModalDeliveryChange("pickup"));
    }

    const modalCashRadio = document.querySelector('input[name="modal-payment-method"][value="cash"]');
    const modalTransferRadio = document.querySelector('input[name="modal-payment-method"][value="transfer"]');

    const handleModalPaymentChange = (method) => {
        // Actualizar el radio button original de la barra lateral para sincronizar
        const originalRadio = document.querySelector(`input[name="payment-method"][value="${method}"]`);
        if (originalRadio) {
            originalRadio.checked = true;
            originalRadio.dispatchEvent(new Event("change"));
        }
    };

    if (modalCashRadio && modalTransferRadio) {
        modalCashRadio.addEventListener("change", () => handleModalPaymentChange("cash"));
        modalTransferRadio.addEventListener("change", () => handleModalPaymentChange("transfer"));
    }

    // Sincronizar hacia atrás desde el modal hacia el sidebar
    const modalName = document.getElementById("modal-client-name");
    const modalAddress = document.getElementById("modal-client-address");
    const modalNotes = document.getElementById("modal-client-notes");

    const syncBack = (source, targetId) => {
        if (!source) return;
        source.addEventListener("input", (e) => {
            const target = document.getElementById(targetId);
            if (target) target.value = e.target.value;
        });
    };

    syncBack(modalName, "client-name");
    syncBack(modalAddress, "client-address");
    syncBack(modalNotes, "client-notes");

    // Envío del pedido desde el modal
    const modalForm = document.getElementById("modal-checkout-form");
    if (modalForm) {
        modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            sendOrderViaWhatsApp();
        });
    }
}

// Construir el mensaje de pedido y redirigir a WhatsApp
function sendOrderViaWhatsApp() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Detectar de qué formulario tomar los datos (el que esté visible)
    const isModalVisible = document.getElementById("cart-modal-overlay").style.display === "flex";
    
    let name = "";
    let address = "";
    let notes = "";
    
    if (isModalVisible) {
        name = document.getElementById("modal-client-name").value.trim();
        notes = document.getElementById("modal-client-notes").value.trim();
        const deliveryMethod = document.querySelector('input[name="modal-delivery-method"]:checked').value;
        if (deliveryMethod === "home") {
            address = document.getElementById("modal-client-address").value.trim();
        }
    } else {
        name = document.getElementById("client-name").value.trim();
        notes = document.getElementById("client-notes").value.trim();
        const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
        if (deliveryMethod === "home") {
            address = document.getElementById("client-address").value.trim();
        }
    }

    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const deliveryCost = deliveryMethod === "home" ? 1000 : 0;
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const grandTotal = subtotal + deliveryCost;

    // Construcción del texto del pedido
    let text = `¡Hola *Wayra Verduras*! 🥬✨\nQuisiera realizar el siguiente pedido:\n\n`;
    text += `🛒 *DETALLE DEL PEDIDO:*\n`;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        text += `• *${item.quantity}x ${item.name}* (${item.weight}) — $${itemTotal.toLocaleString('es-AR')}\n`;
    });

    text += `\n💵 *Subtotal Productos:* $${subtotal.toLocaleString('es-AR')}\n`;
    
    if (deliveryMethod === "home") {
        text += `🚚 *Entrega:* Envío a domicilio ($1.000)\n`;
        text += `📍 *Dirección:* ${address}, Rosario\n`;
    } else {
        text += `🏠 *Entrega:* Retiro en casa ($0)\n`;
    }

    // Método de pago
    const paymentMethodRadio = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodRadio ? paymentMethodRadio.value : 'cash';
    if (paymentMethod === "transfer") {
        text += `💳 *Método de Pago:* Transferencia (alias: wayra.verduras)\n`;
    } else {
        text += `💵 *Método de Pago:* Efectivo\n`;
    }

    text += `👤 *Cliente:* ${name}\n`;

    if (notes) {
        text += `📝 *Aclaraciones:* _"${notes}"_\n`;
    }

    text += `\n💰 *TOTAL A PAGAR: $${grandTotal.toLocaleString('es-AR')}*\n`;
    text += `\n¡Quedo a la espera de la confirmación del pedido! ¡Muchas gracias!`;

    // Codificar URL
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

    // Abrir enlace de WhatsApp en una pestaña nueva
    window.open(whatsappUrl, "_blank");

    // Limpiar carrito después de enviar el pedido
    cart = [];
    saveCart();
    updateCart();
    
    // Cerrar modal si estuviera abierto
    document.getElementById("cart-modal-overlay").style.display = "none";
    document.body.style.overflow = "";

    alert("¡Pedido generado! Te estamos redirigiendo a WhatsApp para enviarlo.");
}
