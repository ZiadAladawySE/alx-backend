#!/usr/bin/python3
"""inherits from BaseCaching and is a caching system"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """caching system"""
    def put(self, key, item):
        """assign to the dictionary the item value for the key"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        return self.cache_data.get(key, None)
