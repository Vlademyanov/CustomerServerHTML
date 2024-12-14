package com.vldm.WebViewApp

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.vldm.WebViewApp.R

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // Установка разметки

        webView = findViewById(R.id.webView) // Инициализация WebView
        webView.webViewClient = WebViewClient() // Установка клиента для WebView
        webView.settings.javaScriptEnabled = true // Включение JavaScript

        // Загрузка HTML-страницы из assets
        webView.loadUrl("file:///android_asset/index.html")
    }
}