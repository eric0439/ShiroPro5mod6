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
.md-card {
    margin-top: 8px;
    margin-bottom: 8px;
}
.detail {
    min-height: 300px;
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
                    {{lang}}
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
            <md-card class="detail">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">{{ detailCharacter.name }}<img :src="icon('terrain', detailCharacter.terrain)"><img :src="icon('weapon', detailCharacter.weapon)"></div>
                        <div class="md-subhead">{{$t('rank.origin')}}<span v-html="rank(detailCharacter.rank.origin)"></span>
                        {{$t('rank.mod')}}<span v-html="rank(detailCharacter.rank.mod)"></span>
                        {{$t('rank.recom')}}<span v-html="rank(detailCharacter.rank.recom)"></span></div>
                    </md-card-header-text>

                    <md-card-media md-medium>
                        <img v-bind:src="img(detailCharacter.id)">
                    </md-card-media>
                </md-card-header>
                <md-card-content>
                    <div style="flex: 1;">
                        <div class="md-subheading">{{$t('skillTitle')}}</div>
                        <b>{{$t('origin')}}</b>：<br/><b>{{detailCharacter.skill.origin.title}}</b> {{detailCharacter.skill.origin.description}}
                        <br />
                        <b>{{$t('mod')}}</b>：<br/><b>{{detailCharacter.skill.mod.title}}</b> {{detailCharacter.skill.mod.description}}
                        <br/><br/>
                        <div class="md-subheading">{{$t('str')}}</div>
                        <b>{{$t('origin')}}</b>：<br/>{{detailCharacter.str.origin}}
                        <br />
                        <b>{{$t('mod')}}</b>：<br/>{{detailCharacter.str.mod}}
                        <br /><br />
                        <div class="md-subheading">{{$t('comment')}}</div>
                        {{detailCharacter.comment}}
                    </div>
                </md-card-content>
            </md-card>
            <md-table v-model="searched" md-sort="id" md-card v-on:md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">{{$t('character')}}</h1>
                    <md-field md-clearable class="md-toolbar-section-end">
                        <md-input v-bind:placeholder="$t('searchByName')" v-model="search" v-on:input="searchOnTable" />
                    </md-field>
                </md-table-toolbar>
                <md-table-empty-state
                    md-label="No users found"
                    v-bind:md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
                </md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" v-bind:class="classSelect(item)">
                    <md-table-cell md-label="id" md-numeric md-sort-by="id">{{ item.id }}</md-table-cell>
                    <md-table-cell v-bind:md-label="$t('character')" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell v-bind:md-label="$t('rarity')" md-sort-by="rarity"><span v-html="rarity(item.rarity)"></span></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('terrain')" md-sort-by="terrain"><img :src="icon('terrain', item.terrain)"></md-table-cell>
                    <md-table-cell v-bind:md-label="$t('weapon')" md-sort-by="weapon"><img :src="icon('weapon', item.weapon)"></md-table-cell>
                </md-table-row>
            </md-table>
        </md-app-content>
    </md-app>
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
            defaultCharacter: {
                "id": 0,
                "name": "城娘",
                "rarity": 0,
                "mod": true,
                "weapon": "",
                "terrain": "",
                "skill": {
                    "origin": {
                        "title": "特技",
                        "description": ""
                    },
                    "mod": {
                        "title": "特技改",
                        "description": ""
                    }
                },
                "str": {
                    "origin": "計略",
                    "mod": "計略改"
                },
                "rank": {
                    "origin": 0,
                    "mod": 0,
                    "recom": 0
                },
                "comment": ""
            },
            detailCharacter: {
                "id": 0,
                "name": "城娘",
                "rarity": 0,
                "mod": true,
                "weapon": "",
                "terrain": "",
                "skill": {
                    "origin": {
                        "title": "特技",
                        "description": ""
                    },
                    "mod": {
                        "title": "特技改",
                        "description": ""
                    }
                },
                "str": {
                    "origin": "計略",
                    "mod": "計略改"
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
        this.searched = this.characters;
    },
    methods: {
        icon: function(type, name) {
            if(type != "" && name != "")
            return require("./assets/img/" + type + "/" + name + ".png");
            else
            return "";
        },
        img: function(name) {
            if(name != "")
            return require("./assets/img/character/" + name + ".jpg");
            else
            return "";
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
        onSelect: function(character) {
            this.detailCharacter = character;
        },
        classSelect: ({ weapon }) => ({
            'md-accent': weapon === "knife" || weapon === "spear" || weapon === "spindle" || weapon === "shield" || weapon === "punch",
            'md-primary': weapon === "bow" || weapon === "cannon" || weapon === "crossbow" || weapon === "gun" || weapon === "ring" || weapon === "song" || weapon === "spell" || weapon === "staff"
        }),
    }
}

</script>
