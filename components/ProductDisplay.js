app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img :src="image" alt="" />
          </div>

          <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>



            <detail-list :details="details"></detail-list>

            <div
              class="color-circle"
              v-for="(variant, index) in variants"
              :key="variant.id"
              @mouseover="updateVariant(index)"
              :style="{ backgroundColor: variant.color}"
            ></div>
            <button class="button" :class="{disabledButton : !inStock}"
            :disabled="!inStock" @click="addToCart">Add to Cart</button>
            <button class="button" :class="{disabledButton : !inStock}"
            :disabled="!inStock" @click="removeItem">Remove Item</button>
          </div>

          <review-list v-if="reviews.length > 0" :reviews="reviews"></review-list>

          <review-form @review-submitted="addReview"></review-form>
        </div>
      </div>`,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: 2234,
          color: "green",
          image: "./assets/images/socks_green.jpg",
          quantity: 50,
        },
        {
          id: 2235,
          color: "blue",
          image: "./assets/images/socks_blue.jpg",
          quantity: 1,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    test() {
      console.log("working");
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      console.log("working");
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeItem() {
      this.$emit("remove-item", this.variants[this.selectedVariant].id);
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return 2.99;
      }
    },
  },
});
