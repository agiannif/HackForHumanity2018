import numpy as np

test_data_x = (np.random.uniform(37.782, 37.784, 100))
test_data_y = (np.random.uniform(-122.445, -122.39, 100))
for i in range(100):
    print('{lat: ',test_data_x[i],', lng: ',test_data_y[i],'},')
