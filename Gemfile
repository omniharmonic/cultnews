source "https://rubygems.org"

# GitHub Pages builds Cult News server-side with this exact gem set, so building
# locally through the same gem keeps parity with production.
gem "github-pages", group: :jekyll_plugins

# Plugins declared in _config.yml (github-pages whitelists these).
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows / JRuby niceties — harmless elsewhere.
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "webrick", "~> 1.8"
