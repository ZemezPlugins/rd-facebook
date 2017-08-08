<h2 class="item1">Как использовать</h2>

<h5>
    Внедрение скрипта на страницу сводится к нескольким простым шагам.
</h5>

<p>
    <strong>Обратите внимание:</strong> предложенный вариант инициализации может отличаться в зависимости от продукта,
    в котором он внедряется. Информация предоставленная ниже лишь отображает принципы работы со скриптом.
</p>

<h3>
    Скачайте скрипт из Git'a
</h3>

<p>
    Для начала необходимо скачать данный скрипт из нашего публичного репозитория:
    <a href="http://products.git.devoffice.com/coding-development/rd-facebook-feed">Кликабельно</a>
</p>

<h3>
    Подготовка
</h3>

<p>
    Для работы скрипта необходимо создать приложение в сервисе
    <a href='https://developers.facebook.com/'>facebook</a> и получить его accessToken.
</p>


<h3>
    Добавьте необходимую разметку
</h3>

<p>
    HTML разметка поста с картинкой и сообщением выглядит следующим образом.
</p>

<code>
<pre>
&lt;!-- RD Facebook Feed --&gt;
    &lt;div class="facebook" data-fb-id="TemplateMonster" data-fb-access="..."&gt;
        &lt;div data-fb-post&gt;
            &lt;img src="images/_blank.png" alt="" data-picture="src" data-remove/&gt;
            &lt;p data-message="text"&gt;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;!-- END RD Facebook Feed --&gt;
</pre>
</code>

<p>
    <strong>Обратите внимание:</strong>
    разметка внутри данного блока может быть произвольной, включая элементы сетки и т.д. Необходимо только наличие
    элемента с атрибутом data-fb-post или data-fb-user.
</p>

<p>
    Получить данные поста facebook возможно только внутри блока с атрибутом data-fb-post или data-fb-user. Для получения данных необходимо
    дописать следующий атрибут: <br/>
    <div style="text-align:center;">data-(название данных)="target"</div> <br/>
    где target - атрибут, в который будут записаны данные. Если в target указать значение “text”, данные будут выведены
    внутрь тега обычным текстом. В target можно записать несколько значений, определив их через запятую.
</p>

<p>Для удаление DOM элемента в случае отсутствия данных с Facebook необходимо добавить атрибут data-remove. Данный атрибут
действует только для элементов в которые будут записываться данные с Facebook.</p>


<h4>Список часто используемых атрибутов:</h4>
<ul class="marked-list">
    <li>
        <dl class="inline-term">
            <dt>data-picture</dt>
            <dd>изображение в посте</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-created_time</dt>
            <dd>дата добавления</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-message</dt>
            <dd>текст сообщения</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-name</dt>
            <dd>название вложения, если используется в data-fb-post или имя пользователя(страницы), если используется в data-fb-user</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-description</dt>
            <dd>описание вложения</dd>
        </dl>
    </li>
    <li>
        <dl class="inline-term">
            <dt>data-likes-count</dt>
            <dd>количество лайков поста</dd>
        </dl>
    </li>
</ul>

<p>Если необходимо вывести информацию не указанную в списке выше - вы можете её найти её в консоле включив лог с помощью data-fb-showlog.
   Например, обьект полученный с facebook содержит строку created_time. Теперь для получения даты создания необходимо добавить data аттрибут,
   учитывая всю пройденную вложенность, разделяя каждый вложенный элемент знаком "-": data-created_time
</p>

<h3>
    HTML разметка для получения дополнительной информации
</h3>

<p>
    Для вывода дополнительной информации о комментарии или лайке необходимо добавить блок с data аттрибутом
    data-fb-like, data-fb-comment соответсвенно, и уже внутри данных блоков
    выводить требуемую информацию. Например, для вывода имени пользователя, поставившего лайк необходима следующая разметка:
</p>

<code>
<pre>
&lt;div data-fb-post&gt;
    &lt;div data-fb-like&gt;
        &lt;div data-likes-data-name="text"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>
</code>

<h3>
    Подключите скрипт на странице
</h3>

<p>
    Вам необходимо скоппировать скрипт в папку /js вашего проекта и выполнить его подключение на странице. Для это можно
    исспользовать следующий участок кода:
</p>

<code>
<pre>
&lt;script src="js/jquery.rd-facebook-feed.min.js"&gt;&lt;/script&gt;
</pre>
</code>


<h3>
    Выполните инициализацию скрипта
</h3>

<p>
    Вам необходимо выполнить инициализацию скрипта для элементов по целевому селектору, с помощью следующего участка кода
</p>

<code>
<pre>
&lt;script&gt;
  $(document).ready(function () {
    o.RDFacebookFeed({}); // Additional options
  });
&lt;/script&gt;
</pre>
</code>

