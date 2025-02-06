#!/usr/bin/python3
"""inherits from BaseCaching and is a caching system"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """caching system"""
    def __init__(self):
        """initializer"""
        super().__init__()
        self.keys = []

    def put(self, key, item):
        """assign to the dictionary the item value for the key"""
        if key is not None and item is not None:
            self.cache_data[key] = item
            if key not in self.keys:
                self.keys.append(key)
            else:
                self.keys.append(self.keys.pop(self.keys.index(key)))
            if len(self.keys) > BaseCaching.MAX_ITEMS:
                last = self.keys.pop(-2)
                del self.cache_data[last]
                print(f"DISCARD: {last}")

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        return self.cache_data.get(key, None)
