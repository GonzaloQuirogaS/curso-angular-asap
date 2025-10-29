# 📚 Google Books App

[![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Books API](https://img.shields.io/badge/API-Google%20Books-4285F4?logo=google&logoColor=white)](https://developers.google.com/books)

---

## 📖 Descripción General

**Google Books Explorer** es una aplicación web moderna desarrollada con **Angular 20** que permite explorar, buscar y descubrir millones de libros a través de la **Google Books API**.  
Con una interfaz elegante en modo oscuro y controles intuitivos, la aplicación ofrece una experiencia fluida para encontrar tu próxima lectura.

---
## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| **Angular 20** | Framework SPA con las últimas features (Signals, Control Flow) |
| **TypeScript 5** | Lenguaje tipado para código robusto y mantenible |
| **Google Books API** | Base de datos de millones de libros |
| **CSS3** | Estilos modernos con gradientes, animaciones y grid |

---

## 🎯 Características Principales

### 🔍 Búsqueda Avanzada
- **Búsqueda inteligente:** Encuentra libros por título, autor o género
- **Filtros especializados:** 
  - 📖 **Todos:** Búsqueda general en toda la base de datos
  - 📝 **Título:** Búsqueda específica por nombre del libro
  - 👤 **Autor:** Encuentra libros de tu autor favorito
  - 🏷️ **Género:** Explora por categorías literarias
- **Resultados masivos:** Obtiene hasta **200 libros** por búsqueda mediante peticiones paralelas
- **Búsqueda rápida:** Presiona Enter para buscar instantáneamente

### 📊 Ordenamiento Flexible
- **Sin ordenar:** Orden original de la API
- **Título (A-Z):** Orden alfabético ascendente
- **Título (Z-A):** Orden alfabético descendente
- **Calificación (Mayor a Menor):** Los mejor valorados primero
- **Calificación (Menor a Mayor):** Ordenamiento inverso por rating

### 📱 Visualización de Contenido
- **Grid responsivo:** Diseño adaptable que se ajusta a cualquier pantalla
- **Cards interactivas:** Efectos hover elegantes con gradientes
- **Badges de calificación:** Indicador visual de estrellas en libros valorados
- **Imágenes de alta calidad:** Sistema que prioriza las mejores resoluciones disponibles
- **Contador de resultados:** Muestra la cantidad de libros encontrados

### 📖 Detalles del Libro
- **Vista completa:** Información detallada de cada libro
- **Portada en alta definición:** Imágenes optimizadas para máxima calidad
- **Metadata completa:**
  - 👤 Autor(es)
  - 📚 Editorial
  - 📅 Fecha de publicación
  - 📄 Cantidad de páginas
  - 🌐 Idioma
  - 🏷️ Categorías
  - ⭐ Calificación promedio y cantidad de valoraciones
- **Descripción completa:** Sinopsis del libro con formato HTML
- **Vista previa:** Enlace directo a Google Books para leer fragmentos

### 🎨 Diseño y UX
- **Modo oscuro completo:** Interfaz elegante con tema oscuro profesional
- **Gradientes modernos:** Colores púrpura y azul (#667eea → #764ba2)
- **Animaciones suaves:** Transiciones y efectos visuales fluidos
- **Loading states:** Spinners elegantes durante las cargas
- **Responsive design:** Funciona perfectamente en móviles, tablets y desktop

---

## 🏗️ Arquitectura Técnica

### Estructura de Carpetas
```
src/app/
├── components/
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.css
│   ├── book-detail/
│   │   ├── book-detail.component.ts
│   │   ├── book-detail.component.html
│   │   └── book-detail.component.css
│   └── search-bar/
│       ├── search-bar.component.ts
│       ├── search-bar.component.html
│       └── search-bar.component.css
├── models/
│   └── book.model.ts
├── services/
│   └── books.service.ts
├── app.config.ts
├── app.routes.ts
└── app.component.ts
```

## 📂 Componentes Principales

### HomeComponent
- Lista principal de libros
- Grid responsivo con cards
- Integración con SearchBarComponent
- Sistema de ordenamiento con computed signals

### SearchBarComponent
- Barra de búsqueda con icono integrado
- Selectores de filtro y ordenamiento
- Comunicación mediante outputs signals
- Diseño compacto y elegante

### BookDetailComponent
- Vista detallada de un libro específico
- Portada en alta resolución
- Metadata completa y organizada
- Botón de vista previa

### BooksService
- Gestión de peticiones a Google Books API
- Búsquedas con múltiples requests paralelos
- Manejo de estados de carga con signals

---

## 🔄 Flujo de Datos

1. **Usuario ingresa búsqueda** en SearchBarComponent
2. **Componente emite evento** con parámetros de búsqueda
3. **HomeComponent recibe evento** y llama al servicio
4. **BooksService hace 5 requests paralelos** con forkJoin
5. **Resultados se combinan** y almacenan en signal
6. **Computed signal aplica ordenamiento** según selección
7. **Vista se actualiza automáticamente** con los libros ordenados

---



## 🚀 Cómo Ejecutar el Proyecto

### Deploy en GitHub Pages

El proyecto está publicado en **GitHub Pages**

 Link del proyecto: [Google Books App](https://gonzaloquirogas.github.io/curso-angular-asap/)


### Prerrequisitos para ejecucion en entorno local
- Node.js (v18 o superior)
- npm o yarn
- Angular CLI 20

### Instalación y Ejecución en entorno local

```bash
# 1. Clonar el repositorio
git clone https://github.com/GonzaloQuirogaS/curso-angular-asap.git

# 2. Acceder a la carpeta del proyecto
cd curso-angular-asap

# 3. Instalar las dependencias
npm install

# 4. Ejecutar la aplicación en modo desarrollo
ng serve

# 5. Abrir en el navegador
# Navega a http://localhost:4200
```




## 📝 Mejoras Futuras

- [ ] Implementar paginación infinita (infinite scroll)
- [ ] Agregar favoritos con LocalStorage
- [ ] Sistema de notas y reseñas personales
- [ ] Compartir libros en redes sociales
- [ ] Modo claro/oscuro toggle
- [ ] Historial de búsquedas
- [ ] Filtros adicionales (idioma, fecha, páginas)
- [ ] Export a PDF de lista de libros