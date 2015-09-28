# turbotabs
TurboTabs is responsive tabs jquery plugin with plenty of customization options and easy to follow HTML markup.

Homepage: http://themeflection.com/plug/turbotabs-responsive-tabs-jquery-plugin/ <br/>
For live preview check <a href="http://themeflection.com/plugins/jquery/turbotabs/index.html">Demo</a><br/>

You can also use my online options builder (available in the Demo) that will make it easier for you to implement the plugin options. Play with live previewer and when you are ready click on button "get options".

For more advanced usage visit official <a href="http://themeflection.com/plugins/jquery/turbotabs/documentation/documentation.html">documentation </a>

<h3>Usage</h3>
<h4>HTML Markup</h4>
<pre><code>&lt;div id="main"&gt;
    &lt;!-- - - - - - Tab navigation - - - - - - --&gt;
    &lt;ul class=&quot;tt_tabs&quot;&gt;
        &lt;li class=&quot;active&quot;&gt;Tab 1&lt;/li&gt;
        &lt;li&gt;Tab 2&lt;/li&gt;
        &lt;li&gt;Tab 3&lt;/li&gt;
    &lt;/ul&gt;
    &lt;!-- - - - - Tab Content - - - - - --&gt;
    &lt;div class=&quot;tt_container&quot;&gt;
       &lt;div class=&quot;tt_tab active&quot;&gt;
              --- Some Content ---
        &lt;/div&gt;
         &lt;div class=&quot;tt_tab&quot;&gt;
              --- Some Content ---
        &lt;/div&gt;
        &lt;div class=&quot;tt_tab&quot;&gt;
              --- Some Content ---
        &lt;/div&gt;
    &lt;/div&gt;&lt;!-- .tt_container --&gt;
    
&lt;/div&gt; &lt;!-- #main --&gt; 
</pre></code>
<h4>CSS</h4>
<pre><code>&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/turbotabs.css&quot; /&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/animate.min.css&quot; /&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/font-awesome.min.css&quot; /&gt;
</pre></code>
<h4>jQuery</h4>
<pre><code>&lt;script src=&quot;js/jquery-1.9.1.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;js/turbotabs.min.js&quot;&gt;&lt;/script&gt;
</pre></code>
<h4>Initializing</h4>
<pre><code>$(document).ready(function(){
    $('#main').turbotabs(); 
]);
</pre></code>
<br/>
Licenced under MIT licence

<h4>Changelog</h4>
<table>
<tr>
<td>Version 1.2 </td>
<td> -Fixed trasnformation issues (tabs dissapearing when shifted to accordion)<br/>
-Fixed Smooth animation issue in accordion mode<br/>
-Added random animation mode - Special Thanks go to miltosc (https://github.com/miltosc) who contributed with this functionality
</td>
</tr>
<tr>
<td>Version 1.1  </td>
<td>Added 28 animations,  added tt_prefixes to fix compatibility issues with other CSS frameworks such as foundation and bootstrap.</td>
</tr>
<tr>
<td>Version 1.0 </td>
<td> Initial release </td>
</tr>
</table>                          
