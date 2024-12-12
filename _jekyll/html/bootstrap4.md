---
title: Bootstrap@4
slug: html/bootstrap@4
---

{% for meta in site.data.examples.metas %}
  {% if meta.slug == page.slug and meta.children.size > 0 %}
  {% for category in meta.children %}
  <h2 class="h2">{{category.name}}</h2>
  <p class="mb-0">{{category.description}}</p>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
    {% for category_content in category.contents %}
      {% assign content_slug = category_content | prepend: "html/bootstrap4/" %}
      {% for content in site.data.examples.contents %}
        {% if content_slug == content.slug %}
        <div class="col p-2">
          <a class="card text-decoration-none">
            <div class="card-img-top">
              <img class="viewer" src="https://cdn.jsdelivr.net/gh/langnang/examples/{{content.slug}}/screenshot.png" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{content.title}}</h5>
              <!-- <div class="mb-1">
                <span :class="'badge badge-'+randomThemeType()+' mr-1'" v-for="tag in tags.filter(v=>(v.contents||[]).includes(content.slug))" :key="tag.slug">{{tag.name}}</span>
              </div> -->
              <p class="card-text text-muted">{{content.description}}</p>
            </div>
          </a>
        </div>
        {% endif %}
      {% endfor %}
    {% endfor %}
  </div>
  {% endfor %}
  {% endif %}
{% endfor %}
