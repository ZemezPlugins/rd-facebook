<h2 class="item1">Настройки скрипта</h2>

<h5>
    Скрипт поддерживает следующие опции для настройки
</h5>

<h3>
    Общие настройки
</h3>

<p>
    Общие настройки скрипта определяются в объекте options при инициализации.
</p>

<h5>id</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>

<p>
    Идентификатор страницы, с которой будут выводится посты (можно получить из адресной строки).
</p>

<h5>accessToken</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>

<p>
    Идентификатор приложения сервиса Facebook.
</p>

<h5>showLog</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Boolean</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>false</dd>
</dl>

<p>
    Включает\отключает вывод логов в консоль
</p>


<h5>dateFormat</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>


<p>
    Составной обьект для отображения даты добавления. Состоит из следующих вложенных опций:
</p>


<div class="inner">
    <h5>seconds</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd>less than a minute ago</dd>
    </dl>

    <p>
        Текст, выводимый вместо даты, если пост добавлено меньше минуты назад.
    </p>

    <h5>minute</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd>about a minute ago</dd>
    </dl>

    <p>
        Текст, выводимый вместо даты, если пост добавлен минуту назад.
    </p>

    <h5>minutes</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd> minutes ago</dd>
    </dl>

    <p>
        Текст, выводимый возле количества минут, с момента добавления поста (5 minutes ago).
    </p>

    <h5>hour</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd>about an hour ago</dd>
    </dl>

    <p>
        Текст, выводимый вместо даты, если пост добавлен час назад.
    </p>


    <h5>hours</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd> hours ago</dd>
    </dl>

    <p>
        Текст, выводимый возле количества часов, с момента добавления поста (5 hours ago).
    </p>

    <h5>day</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd>1 day ago</dd>
    </dl>

    <p>
        Текст, выводимый вместо даты, если пост добавлен вчера.
    </p>

    <h5>days</h5>
    <dl class="inline-term">
        <dt>Тип</dt>
        <dd>String</dd>
    </dl>
    <dl class="inline-term">
        <dt>Значение по-умолчанию</dt>
        <dd>%b/%d/%Y</dd>
    </dl>

    <p>
        Формат вывод даты. Дата будет отображаться в данном формате, по истечении 2-х дней после добавления. Список допустимых значений:
    </p>

    <ul class="marked-list">
        <li>
            <dl class="inline-term">
                <dt>
                    %d
                </dt>
                <dd>
                    вывод числа(1,2,3)
                </dd>
            </dl>
        </li>
        <li>
            <dl class="inline-term">
                <dt>
                    %Y
                </dt>
                <dd>
                    вывод полного формата года(2011, 2013, 2015)
                </dd>
            </dl>
        </li>
        <li>
            <dl class="inline-term">
                <dt>
                    %y
                </dt>
                <dd>
                    вывод последних 2 цифр года(11, 13, 15)
                </dd>
            </dl>
        </li>
        <li>
            <dl class="inline-term">
                <dt>
                    %m
                </dt>
                <dd>
                    вывод номера месяца(1,2,3)
                </dd>
            </dl>
        </li>
        <li>
            <dl class="inline-term">
                <dt>
                    %B
                </dt>
                <dd>
                    вывод полного названия месяца(January,February, March)
                </dd>
            </dl>
        </li>
        <li>
            <dl class="inline-term">
                <dt>
                    %b
                </dt>
                <dd>
                    вывод сокращенного названия месяца(Jan, Feb, Mar)
                </dd>
            </dl>
        </li>
    </ul>
</div>


<h5>callbacks</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Object</dd>
</dl>

<p>
    Объект, который используется для определений callback функций для определенных событий
</p>


<h3>
    События
</h3>

<h5>userLoaded</h5>

<p>
    Функция сработает при загрузке данных о пользователе.
</p>

<h5>postsLoaded</h5>

<p>
    Функция сработает при загрузке данных о постах.
</p>


<h3>
    Настройки с помощью data атрибутов
</h3>

<p>
    Скрипт также поддерживает дополнительную настройку  в HTML разметке с помощью data-атрибут API.
</p>


<h5>data-fb-page-type</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>

<p>
    Описывает тип страницы с которой будут выводится посты. Принимает значения: page, group
</p>
<h5>data-fb-id</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>

<p>
    Идентификатор страницы, с которой будут выводится посты (можно получить из адресной строки).
</p>

<h5>data-fb-access</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Number</dd>
</dl>

<p>
    Идентификатор приложения сервиса Facebook.
</p>

<h5>data-fb-showlog</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>Boolean</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>false</dd>
</dl>

<p>
    Включает\отключает вывод логов в консоль
</p>


<h5>data-fb-date-format</h5>
<dl class="inline-term">
    <dt>Тип</dt>
    <dd>String</dd>
</dl>
<dl class="inline-term">
    <dt>Значение по-умолчанию</dt>
    <dd>%b/%d/%Y</dd>
</dl>

<p>
    Формат вывод даты. Дата будет отображаться в данном формате, по истечении 2-х дней после добавления.
</p>

