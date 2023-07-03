import { environment } from 'src/environments/environment';

export interface PlaceholderValue {
  placeholder: string;
  value: string;
}

export class UrlCreator {
  url: string = '';
  pathVariableList: PlaceholderValue[] = [];
  queryParamList: PlaceholderValue[] = [];

  static of(url: string) {
    const creator = new UrlCreator();
    creator.ofUrl(url);
    return creator;
  }

  ofUrl(url: string) {
    this.url = url;
  }

  addPathVariable(placeholderPath: string, value: any) {
    const newPlaceholder: string = `{${placeholderPath}}`;
    this.pathVariableList.push({ placeholder: newPlaceholder, value });
    return this;
  }

  addQueryParam(placeholder: string, value: any) {
    this.queryParamList.push({ placeholder, value });
    return this;
  }

  createUrl(): string {
    let newUrl = this.url;
    this.pathVariableList.forEach((value) => {
      newUrl = newUrl.replace(value.placeholder, value.value);
    });

    if (this.queryParamList.length > 0) {
      const queries = this.queryParamList
        .map((item) => `${item.placeholder}=${item.value}`)
        .join('&');

      newUrl = newUrl + '?' + queries;
    }
    return environment.apiUrl + newUrl;
  }

  createKeycloakUrl(): string {
    let newUrl = this.url;
    this.pathVariableList.forEach((value) => {
      newUrl = newUrl.replace(value.placeholder, value.value);
    });

    if (this.queryParamList.length > 0) {
      const queries = this.queryParamList
        .map((item) => `${item.placeholder}=${item.value}`)
        .join('&');

      newUrl = newUrl + '?' + queries;
    }
    return newUrl;
  }
}
