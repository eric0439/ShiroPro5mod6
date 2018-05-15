<style src="./assets/css/material-icon.css"></style>
<style>
.star {
    font-size: 1.5em;
    display: inline-block;
    color: gray;
    position:relative;
}
.star:last-child {
    margin-right: 0;
}
.star:before {
    content:'\2605';
}
.star.on {
    color: gold;
}
.star.half:after {
    content:'\2605';
    color: gold;
    position: absolute;
    left:0;
    right:50%;
    top:0;
    bottom:0;
    overflow: hidden;
}
.md-dialog {
    max-width: 768px;
}
</style>
<template>

<div id="app">
    <md-app>
        <md-app-toolbar class="md-primary" md-elevation="1">
            <h3 class="md-title" style="flex: 1">{{$t('appTitle')}}</h3>
            <div class="md-toolbar-section-end">
            <md-menu md-direction="bottom-end">
                <md-button md-menu-trigger>
                    <md-icon>language</md-icon> {{lang}}
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="lang = 'jp'">日本語</md-menu-item>
                    <md-menu-item @click="lang = 'zh'">繁體中文</md-menu-item>
                    <md-menu-item @click="lang = 'cn'">简体中文</md-menu-item>
                </md-menu-content>
            </md-menu>
            </div>
        </md-app-toolbar>
        <md-app-content>
            <md-table v-model="searched" md-sort="id" md-card>
                <md-table-toolbar>
                    <h1 class="md-title">{{$t('character')}}</h1>
                    <md-field md-clearable class="md-toolbar-section-end">
                        <md-input v-bind:placeholder="$t('searchByName')" v-model="search" @input="searchOnTable" />
                    </md-field>
                </md-table-toolbar>
                <md-table-empty-state
                    md-label="No users found"
                    :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
                </md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }" v-on:click.native="onClickDetail(item)">
                    <md-table-cell md-label="id" md-numeric md-sort-by="id">{{ item.id }}</md-table-cell>
                    <md-table-cell v-bind:md-label="$t('character')" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell v-bind:md-label="$t('rarity')" md-sort-by="rarity"><span v-html="rarity(item.rarity)"></span></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('terrain')" md-sort-by="terrain"><img :src="icon('terrain', item.terrain)"></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('weapon')" md-sort-by="weapon"><img :src="icon('weapon', item.weapon)"></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('rank.origin')" md-sort-by="rank.origin"><span v-html="rank(item.rank.origin)"></span></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('rank.mod')" md-sort-by="rank.mod"><span v-html="rank(item.rank.mod)"></span></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('rank.recom')" md-sort-by="rank.recom"><span v-html="rank(item.rank.recom)"></span></md-table-cell>
                </md-table-row>
            </md-table>
        </md-app-content>
    </md-app>
    <md-dialog v-bind:md-active.sync="flagDialogDetail">
          <md-dialog-title>{{ detailCharacter.name }}</md-dialog-title>
          <md-dialog-content>

          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-primary" v-on:click="flagDialogDetail = false">{{$t('close')}}</md-button>
          </md-dialog-actions>
    </md-dialog>
</div>

</template>

<script>
const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => item.name.includes(term))
    }

    return items
}
import characters from "./data/data.json"

export default {
    name: 'app',
    components: {

    },
    data: function() {
        return {
            characters: characters,
            detailCharacter: {
                "id": 0,
                "name": "",
                "rarity": 0,
                "mod": true,
                "weapon": "knife",
                "terrain": "hirayama",
                "skill": {
                    "origin": {
                        "title": "",
                        "description": "%上昇"
                    },
                    "mod": {
                        "title": "",
                        "description": "%、防御が27%上昇"
                    }
                },
                "str": {
                    "origin": "",
                    "mod": ""
                },
                "rank": {
                    "origin": 0,
                    "mod": 0,
                    "recom": 0
                },
                "comment": ""
            },
            modelCharacter: null,
            search: null,
            searched: [],
            lang: this.$i18n.locale(),
            flagDialogDetail: false,
        }
    },
    computed: {

    },
    watch: {
        lang(newValue, oldValue) {
            this.$i18n.set(newValue);
        }
    },
    created() {
        this.searched = this.characters
    },
    methods: {
        icon: function(type, name) {
            return require("./assets/img/" + type + "/" + name + ".png");
        },
        rarity: function(rarity) {
            var i;
            var str = "";
            for (i = 0; i < rarity; i++) {
                str += "&#9733";
            }
            return str;
        },
        rank: function(rank) {
            var str = "";
            var star_on = '<span class="star on"></span>';
            var star_half = '<span class="star half"></span>';
            var star = '<span class="star"></span>';
            switch(rank) {
                case 0:
                    str = star + star + star;
                    break;
                case 0.5:
                    str = star_half + star + star;
                    break;
                case 1:
                    str = star_on + star + star;
                    break;
                case 1.5:
                    str = star_on + star_half + star;
                    break;
                case 2:
                    str = star_on + star_on + star;
                    break;
                case 2.5:
                    str = star_on + star_on + star_half;
                    break;
                case 3:
                    str = star_on + star_on + star_on;
                    break;
            }
            return str;
        },
        searchOnTable () {
            this.searched = searchByName(this.characters, this.search)
        },
        onClickDetail: function(character) {
            this.detailCharacter = character;
            this.flagDialogDetail = true;
        }
    }
}

</script>
