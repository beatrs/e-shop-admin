
import { Component } from "react"
import { Link, useNavigate } from "react-router-dom"

const Redirect = (url) => {
    console.log(url)
    const navigate = useNavigate()
    navigate(url)
}

const FormatNumber = {
    withComma: function(val) {
        var parts = (+val).toFixed(2).split(".")
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "")
    }
} 

const FormatDate = {
    getYmd: function(val) {
        var date = val.split('T')[0]
        return date
    }
}

var darkMode = false

const DarkMode = {
    setDarkMode: function(val) {
        darkMode = val
    },

    getDarkMode: function() {
        return darkMode
    }
}

export { FormatNumber, DarkMode, FormatDate, Redirect }