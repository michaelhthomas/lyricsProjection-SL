<template>
  <div>
    <!-- Show add new category -->
    <div>
      <v-row justify="center">
        <v-dialog v-model="addCategoryDialog" persistent max-width="290">
          <v-card>
            <v-container>
              <v-card-title class="headline"
                >{{ $t('addDialog.title') }}</v-card-title
              >
              <form v-on:submit.prevent>
                <v-text-field
                  v-model="category"
                  v-on:keyup.enter="saveCategory"
                  :label="$t('addDialog.fieldLabel')"
                  class="black--text"
                  outlined
                  required
                  autofocus
                ></v-text-field>
              </form>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="addCategoryDialog = false"
                >{{ $t('dialog.cancel') }}</v-btn
              >
              <v-btn color="green darken-1" text @click="saveCategory"
                >{{ $t('save') }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <!-- Show remove category -->
    <div>
      <v-row justify="center">
        <v-dialog v-model="deletecategoryDialog" persistent max-width="290">
          <v-card>
            <v-container>
              <v-card-title class="headline">{{ $t('removeDialog.title') }}</v-card-title>
              <v-card-text>
                {{ $t('removeDialog.rewriteMessage', { category: selectedCategory }) }}
              </v-card-text>
              <form v-on:submit.prevent>
                <v-text-field
                  v-model="category"
                  v-on:keyup.enter="deleteCategory"
                  :label="$t('removeDialog.fieldLabel')"
                  class="black--text"
                  outlined
                  required
                ></v-text-field>
              </form>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="deletecategoryDialog = false"
                >{{ $t('dialog.cancel') }}</v-btn
              >
              <div v-if="selectedCategory === category">
                <v-btn color="green darken-1" text @click="deleteCategory"
                  >{{ $t('choose') }}</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>

    <!-- List categories -->
    <div>
      <v-card class="mx-auto">
        <v-card-title class="white--text secondary">
          {{ $t('title') }}
          <v-spacer></v-spacer>

          <v-btn
            color="tercinary"
            class="text--primary"
            @click="addCategoryDialog = true"
            fab
            small
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4"
          >{{ $t('subtitle') }}</v-card-text
        >

        <v-divider></v-divider>

        <v-virtual-scroll :items="items" :item-height="50" height="300">
          <template v-slot="{ item }">
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar color="secondary" size="56" class="white--text">
                  {{ item.initial }}
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn depressed small @click="showDeleteDialog(item.name)">
                  Izbriši
                  <v-icon color="secondary" right>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </div>
  </div>
</template>

<i18n>
en:
  title: "Categories"
  subtitle: "All song categories are listed below"
  addDialog:
    title: "Add a new category"
    fieldLabel: "Category name"
  removeDialog:
    title: "Delete category"
    rewriteMessage: "Rewrite the category name to delete ({{ selectedCategory }})."
    fieldLabel: "Category name"
sl:
  title: "Kategorije pesmi"
  subtitle: "Spodaj so navedene vse kategorije pesmi"
  addDialog:
    title: "Dodaj novo kategorijo"
    fieldLabel: "Vnesi kategorijo"
  removeDialog:
    title: "Izbriši kategorijo"
    rewriteMessage: "Ponovno napiši ime kategorije za izbris ({{ selectedCategory }})."
    fieldLabel: "Vnesi kategorijo"
</i18n>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AddLyricCategory',
  data () {
    return {
      addCategoryDialog: false,
      deletecategoryDialog: false,
      category: '',
      selectedCategory: ''
    }
  },
  computed: {
    ...mapGetters({
      categories: 'lyric/getCategories'
    }),
    items () {
      return Array.from(this.categories, c => {
        return {
          name: c,
          initial: c[0]
        }
      })
    }
  },
  methods: {
    showDeleteDialog (category) {
      this.deletecategoryDialog = true
      this.selectedCategory = category
    },
    deleteCategory () {
      this.$store.dispatch('lyric/deleteCategory', this.category)
      this.deletecategoryDialog = false
      this.category = ''
      this.selectedCategory = ''
    },
    saveCategory () {
      this.$store.dispatch('lyric/addNewCategory', this.category)
      this.addCategoryDialog = false
      this.category = ''
    }
  }
}
</script>
