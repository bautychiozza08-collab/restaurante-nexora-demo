let cart = [];

let orders = [
  {
    mesa: "Mesa 4",
    productos: "Smash Bacon + Coca Cola",
    total: 11000,
    estado: "👨‍🍳 En preparación"
  },
  {
    mesa: "Mesa 2",
    productos: "Pizza Trufa",
    total: 9200,
    estado: "👨‍🍳 En preparación"
  },
  {
    mesa: "Delivery",
    productos: "Papas Cheddar + Coca Cola",
    total: 7300,
    estado: "🛵 En camino"
  }
];

function hideAllPages() {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
  });

  document.querySelectorAll(".app-page").forEach(page => {
    page.classList.add("hidden");
  });
}

function showLogin() {
  hideAllPages();

  document.getElementById("login").classList.remove("hidden");

  window.scrollTo(0, 0);
}

function loginDemo() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email !== "admin@nexora.com" || password !== "1234") {
    alert("Usá: admin@nexora.com / 1234");
    return;
  }

  document.getElementById("publicNav").classList.add("hidden");
  document.getElementById("appNav").classList.remove("hidden");
  document.getElementById("adminBox").classList.remove("hidden");
  document.getElementById("app").classList.remove("hidden");

  hideAllPages();

  document.getElementById("app").classList.remove("hidden");

  showPage("dashboard");
}

function logout() {
  document.getElementById("publicNav").classList.remove("hidden");
  document.getElementById("appNav").classList.add("hidden");
  document.getElementById("adminBox").classList.add("hidden");
  document.getElementById("app").classList.add("hidden");

  hideAllPages();

  document.getElementById("inicio").classList.remove("hidden");
  document.getElementById("contacto").classList.remove("hidden");

  window.scrollTo(0, 0);
}

function showPage(id) {
  document.querySelectorAll(".app-page").forEach(page => {
    page.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");

  if (id === "pedidos") {
    renderOrders();
  }

  if (id === "cocina") {
    renderKitchen();
  }

  window.scrollTo(0, 0);
}

function addToCart(nombre, precio) {
  cart.push({
    nombre,
    precio
  });

  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartList");
  const total = document.getElementById("cartTotal");

  if (!list || !total) return;

  list.innerHTML = "";

  let sum = 0;

  cart.forEach(item => {
    sum += item.precio;

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.nombre}</span>
      <strong>$${item.precio}</strong>
    `;

    list.appendChild(li);
  });

  total.innerText = sum;
}

function sendOrder() {
  const mesaInput = document.getElementById("mesaInput");
  const mesa = mesaInput.value || "Demo";

  if (cart.length === 0) {
    alert("Agregá al menos un producto.");
    return;
  }

  const products = cart.map(item => item.nombre).join(" + ");

  const total = cart.reduce((acc, item) => {
    return acc + item.precio;
  }, 0);

  orders.unshift({
    mesa: `Mesa ${mesa}`,
    productos: products,
    total,
    estado: "🔥 NUEVO"
  });

  cart = [];

  renderCart();

  mesaInput.value = "";

  showPage("cocina");

  showPopup();

  setTimeout(() => {
    orders[0].estado = "👨‍🍳 En preparación";
    renderKitchen();
    renderOrders();
  }, 6000);
}

function renderOrders() {
  const box = document.getElementById("ordersList");

  if (!box) return;

  box.innerHTML = "";

  orders.forEach(order => {
    const div = document.createElement("div");

    div.className = "list-item";

    div.innerHTML = `
      <strong>${order.mesa}</strong>
      <p>${order.productos} · $${order.total} · ${order.estado}</p>
    `;

    box.appendChild(div);
  });

  const dashPedidos = document.getElementById("dashPedidos");

  if (dashPedidos) {
    dashPedidos.innerText = orders.length;
  }
}

function renderKitchen() {
  const kitchen = document.getElementById("kitchenOrders");

  if (!kitchen) return;

  kitchen.innerHTML = "";

  orders.forEach(order => {
    const div = document.createElement("div");

    div.className = "kitchen-card";

    div.innerHTML = `
      <h3>${order.mesa}</h3>
      <p>${order.productos}</p>
      <h4>$${order.total}</h4>
      <span>${order.estado}</span>
    `;

    kitchen.appendChild(div);
  });
}

function showPopup() {
  const popup = document.getElementById("popup");

  if (!popup) return;

  popup.classList.remove("hidden");

  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play().catch(() => {});

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 3500);
}

function generatePromo() {
  const input = document.getElementById("aiInput");
  const result = document.getElementById("aiResult");

  if (!input.value.trim()) {
    result.innerText = "Escribí una idea para generar una promoción.";
    return;
  }

  result.innerText = `🔥 Promo generada:

“Solo por hoy: promo especial de ${input.value} para clientes del restaurante.”

Ideal para Instagram Stories, WhatsApp y Menú QR.`;
}

renderOrders();
renderKitchen();