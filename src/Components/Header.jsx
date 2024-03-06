import React, { useState } from 'react'
import { Layout, Typography } from 'antd';
import { IoMoon, IoMoonOutline } from "react-icons/io5";

export default function Header() {
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode") == "light") ? true : false)

  const changeMode = () => {
    if (localStorage.getItem("mode") === "dark") {
      document.querySelector("body").classList.remove("dark-mode")
      localStorage.setItem("mode", "light")
      setMode(true)
    }
    else {
      if (mode) {
        document.querySelector("body").classList.add("dark-mode")
        localStorage.setItem("mode", "dark")
        setMode(false)
      }
      else {
        document.querySelector("body").classList.remove("dark-mode")
        localStorage.setItem("mode", "light")
        setMode(true)
      }
    }
  }

  if ((localStorage.getItem('mode')) === "dark") {
    document.querySelector("body").classList.add("dark-mode")
  }
  if ((localStorage.getItem('mode')) === "light") {
    document.querySelector("body").classList.remove("dark-mode")
  }

  return (
    <Layout.Header className='header' >
      <div className="container">
        <header>
          <Typography.Title level={2}>Where in the world?</Typography.Title>
          <Typography.Text onClick={changeMode}>
            {mode ? <IoMoonOutline /> : <IoMoon />} Dark mode
          </Typography.Text>
        </header>
      </div>
    </Layout.Header>
  )
}
